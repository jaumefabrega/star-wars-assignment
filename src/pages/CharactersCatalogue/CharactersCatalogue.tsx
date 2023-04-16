import React from "react";

import { Button } from "@mantine/core";
import { useInfiniteQuery } from "react-query";

import CharacterItem from "modules/characterCatalogue/CharacterItem/CharacterItem";
import swapi from "services/swapi";

import styles from "./charactersCatalogue.module.scss";

const CharactersCatalogue = () => {
  const {
    data,
    isFetching,
    hasNextPage,
    isLoading,
    error,
    isIdle,
    fetchNextPage,
  } = useInfiniteQuery(
    ["getCharacters"],
    ({ pageParam }) => swapi.getCharacters(pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextPageId }
  );

  if (isLoading || isIdle) return <div>Loading...</div>;
  if (error)
    return (
      <div>ERROR: {error instanceof Error ? error.message : "unknown"}</div>
    );
  return (
    <div className={styles.container}>
      <h3>CharactersCatalogue Page</h3>
      <div className={styles.charactersList}>
        {data && // FIX: remove this (fixing types)
          data.pages.map((page) => (
            <React.Fragment key={page.nextPageId}>
              {page.characters.map((character) => (
                <CharacterItem character={character} />
              ))}
            </React.Fragment>
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
    </div>
  );
};

export default CharactersCatalogue;
