import { CharacterI } from "interfaces/interfaces";

import { Button, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useInfiniteQuery } from "react-query";
import { Search } from "tabler-icons-react";

import CharactersList from "modules/characterCatalogue/CharactersList/CharactersList";
import HeadsHeading from "modules/characterCatalogue/HeadsHeading/HeadsHeading";
import swapi from "services/swapi";
import {
  SortingCriterion,
  SortingFields,
  getLabelFromSortCriterion,
  getSortCriterionFromLabel,
  getSortFunction,
  getSortingCriteria,
} from "utils/sorting.utils";

import styles from "./charactersCatalogue.module.scss";

export const sortingFields: SortingFields = {
  name: "alphabetic",
  mass: "numerical",
  height: "numerical",
};

const CharactersCatalogue = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedEyeColor, setSelectedEyeColor] = useState<string | null>(null);

  const sortingCriteria = getSortingCriteria(sortingFields);
  const [selectedSortCriterion, setSelectedSortCriterion] =
    useState<SortingCriterion>(sortingCriteria[0]);

  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
    fetchNextPage,
  } = useInfiniteQuery<{ characters: CharacterI[]; nextPageId: number }, Error>(
    ["getCharacters", searchedTerm],
    ({ pageParam }) => swapi.getCharacters(pageParam, searchedTerm),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const flatCharacters = data?.pages.flatMap((page) => page.characters) || [];

  const distinctEyeColors = flatCharacters
    .map((character) => character.eyeColor)
    .filter((el, i, array) => array.indexOf(el) === i)
    .sort();

  const charactersToDisplay = flatCharacters
    .filter((char) => char.eyeColor === selectedEyeColor || !selectedEyeColor)
    .sort(getSortFunction(sortingFields, selectedSortCriterion));

  const handleSearch = () => {
    setSearchedTerm(searchInput);
    setSelectedEyeColor(null);
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>SW - Characters</title>
        <meta name="description" content="Browse the characters of Star Wars" />
      </Helmet>
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
            value={getLabelFromSortCriterion(selectedSortCriterion)}
            onChange={(value) => {
              if (value) {
                setSelectedSortCriterion(getSortCriterionFromLabel(value));
              }
            }}
            data={sortingCriteria.map(getLabelFromSortCriterion)}
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
        error={error}
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
