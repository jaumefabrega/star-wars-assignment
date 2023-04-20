import { CharacterI } from "interfaces/interfaces";

import { Button, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Search } from "tabler-icons-react";

import CharactersList from "modules/characterCatalogue/CharactersList/CharactersList";
import HeadsHeading from "modules/characterCatalogue/HeadsHeading/HeadsHeading";
import swapi from "services/swapi";

import styles from "./charactersCatalogue.module.scss";

const CharactersCatalogue = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedEyeColor, setSelectedEyeColor] = useState<string | null>(null);

  const sortFields: (keyof CharacterI)[] = ["mass", "height"];
  const sortOptions = sortFields.reduce(
    (options, field) => [...options, `${field} ASC`, `${field} DES`],
    [] as string[] // FIX: TODO: check if this is the best way to type a reduce
  );

  const [selectedSortCriterion, setSelectedSortCriterion] = useState(
    sortOptions[0]
  );

  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
    isIdle,
    fetchNextPage,
  } = useInfiniteQuery(
    ["getCharacters", searchedTerm],
    ({ pageParam }) => swapi.getCharacters(pageParam, searchedTerm),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageId,
      refetchOnWindowFocus: false,
    }
  );

  const flatCharacters = data?.pages.flatMap((page) => page.characters) || [];

  // Could be done with one fewer loop but would be less readable (and anyway the max length is small)
  const distinctEyeColors =
    flatCharacters
      .map((character) => character.eyeColor)
      .filter((el, i, array) => array.indexOf(el) === i) || [];

  const selectedSortField = selectedSortCriterion?.split(
    " "
  )[0] as keyof CharacterI;

  const sortFunction = (a: CharacterI, b: CharacterI) => {
    if (!selectedSortCriterion.includes(" ASC")) {
      [a, b] = [b, a];
    }
    return (
      (Number(a[selectedSortField]) || 0) - (Number(b[selectedSortField]) || 0)
    );
  }; // FIX: move the sorting function to a helper util (also the generation of options)

  const charactersToDisplay =
    flatCharacters
      .filter((char) => char.eyeColor === selectedEyeColor || !selectedEyeColor)
      .sort(sortFunction) || [];

  const handleSearch = () => {
    setSearchedTerm(searchInput);
    setSelectedEyeColor(null);
  };

  return (
    <div className={styles.container}>
      <HeadsHeading />
      <div className={styles.controls}>
        <div className={styles.searchControls}>
          <TextInput
            value={searchInput}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") handleSearch();
            }}
            placeholder="Search by name"
            label="Search by name:"
            className={styles.searchInput}
            disabled={isFetching}
          />

          <Button
            onClick={handleSearch}
            disabled={isFetching}
            variant="filled"
            size="sm"
          >
            <Search />
          </Button>
        </div>
        <div className={styles.clientSideControls}>
          <Select
            label="Eye Color:"
            value={selectedEyeColor}
            onChange={setSelectedEyeColor}
            data={distinctEyeColors}
            clearable
            classNames={{
              root: styles.select,
              item: styles.selectItem,
              input: styles.selectInput,
            }}
          />
          <Select
            label="Sort By:"
            value={selectedSortCriterion}
            onChange={(value) => {
              if (value) setSelectedSortCriterion(value);
            }}
            data={sortOptions}
            classNames={{
              root: styles.select,
              item: styles.selectItem,
              input: styles.selectInput,
            }}
          />
        </div>
      </div>
      <CharactersList
        characters={charactersToDisplay}
        searchedTerm={searchedTerm}
        totalFetched={flatCharacters.length}
        showSkeleton={isLoading && !searchedTerm}
        finishedFetching={!isLoading || !isFetching}
      />
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
        variant="filled"
        size="xs"
      >
        {isLoading || isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>

      <p>
        {flatCharacters.length - charactersToDisplay.length} of{" "}
        {flatCharacters.length} filtered out
      </p>
    </div>
  );
};

export default CharactersCatalogue;
