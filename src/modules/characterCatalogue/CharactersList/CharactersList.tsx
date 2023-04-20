import { CharacterI } from "interfaces/interfaces";

import { SWAPI_ITEMS_PER_PAGE } from "constants/constants";

import CharacterItem from "../CharacterItem/CharacterItem";
import CharacterItemSkeleton from "../CharacterItem/CharacterItem.skeleton";

import styles from "./charactersList.module.scss";

interface Props {
  characters: CharacterI[];
  searchedTerm: string;
  totalFetched: number;
  showSkeleton: boolean;
  finishedFetching: boolean;
}

const CharactersList: React.FC<Props> = ({
  characters,
  searchedTerm,
  totalFetched,
  showSkeleton,
  finishedFetching,
}) => {
  const resultsExplanation = `${
    finishedFetching ? "Showing" : "Loading"
  } results for ${searchedTerm ? `name: ${searchedTerm}` : "ALL names"}`;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>{resultsExplanation}</div>
        <div>Fetched: {totalFetched}</div>
      </div>
      <div className={styles.list}>
        {showSkeleton
          ? Array.from({ length: SWAPI_ITEMS_PER_PAGE }, (_, i) => i).map(
              (v) => <CharacterItemSkeleton key={v} />
            )
          : characters?.map((character) => (
              <CharacterItem character={character} key={character.id} />
            ))}
        {finishedFetching && characters.length === 0 && "No results"}
      </div>
    </div>
  );
};

export default CharactersList;
