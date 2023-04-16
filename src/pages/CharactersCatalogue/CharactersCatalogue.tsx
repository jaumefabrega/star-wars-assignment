import { CharacterI } from "interfaces/interfaces";

import { useState } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { useInfiniteQuery } from "react-query";

import CharacterItem from "modules/characterCatalogue/CharacterItem/CharacterItem";
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

  if (isLoading || isIdle) return <div>Loading...</div>;
  if (error)
    return (
      <div>ERROR: {error instanceof Error ? error.message : "unknown"}</div>
    );

  // Could be done with one fewer loop but would be less readable (and anyway the max length is small)
  const eyeColors =
    data?.pages
      .flatMap((page) => page.characters.map((character) => character.eyeColor))
      .filter((el, i, array) => array.indexOf(el) === i) || [];

  const selectedSortField = selectedSortCriterion?.split(
    " "
  )[0] as keyof CharacterI;

  const charactersToDisplay =
    data?.pages
      .flatMap((page) => page.characters)
      .filter(
        (character) =>
          !selectedEyeColor || character.eyeColor === selectedEyeColor
      )
      .sort(
        (a, b) => {
          if (!selectedSortCriterion.includes(" ASC")) {
            [a, b] = [b, a];
          }
          return (
            (Number(a[selectedSortField]) || 0) -
            (Number(b[selectedSortField]) || 0)
            //* (selectedSortCriterion.includes(" ASC") ? 1 : -1)
          );
        } // FIX: move the sorting function to a helper util (also the generation of options)
      ) || [];

  return (
    <div className={styles.container}>
      <h3>CharactersCatalogue Page</h3>
      <div className={styles.controls}>
        <div className={styles.searchControls}>
          <TextInput
            value={searchInput}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            placeholder="Search by name"
            // FIX: TODO: add onKeyPress (submit)
          />

          <Button
            onClick={() => {
              setSearchedTerm(searchInput);
              setSelectedEyeColor(null);
            }}
            disabled={isFetching}
            variant="filled"
            size="xs"
          >
            Search
          </Button>
        </div>
        <div className={styles.filterControls}>
          <Select
            label="Eye Color"
            value={selectedEyeColor}
            onChange={setSelectedEyeColor}
            data={eyeColors}
            clearable
          />
        </div>
        <div className={styles.sortControls}>
          <Select
            label="Sort By"
            value={selectedSortCriterion}
            onChange={(value) => {
              if (value) setSelectedSortCriterion(value);
            }}
            data={sortOptions}
          />
        </div>
      </div>
      <div className={styles.charactersList}>
        <div className={styles.info}>
          <p>
            Showing results for{" "}
            {!searchedTerm ? "ALL names" : `name: ${searchedTerm}`}
          </p>
          <p>
            Filtered results: {charactersToDisplay.length} of Total:{" "}
            {/* FIX: TODO: prettier*/}
            {data?.pages.flatMap((page) => page.characters).length}
          </p>
        </div>
        {charactersToDisplay?.map((character) => (
          <CharacterItem character={character} key={character.id} />
        ))}
      </div>
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
        variant="filled"
        size="xs"
      >
        {isFetching
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>

      <p>
        Filtered results: {charactersToDisplay.length} Unfiltered results:{" "}
        {/* FIX: TODO: prettier*/}
        {data?.pages.flatMap((page) => page.characters).length}
      </p>
    </div>
  );
};

export default CharactersCatalogue;
