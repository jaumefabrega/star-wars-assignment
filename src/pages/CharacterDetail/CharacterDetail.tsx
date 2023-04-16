import { CharacterI, PlanetI } from "interfaces/interfaces";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import CharacterCard from "modules/characterDetail/CharacterCard/CharacterCard";
import PlanetCard from "modules/characterDetail/PlanetCard/PlanetCard";
import swapi from "services/swapi";

import styles from "./characterDetail.module.scss";

const CharacterDetail = () => {
  const { characterId } = useParams();

  const {
    data: character,
    isLoading: isLoadingCharacter,
    isIdle: isIdleCharacter,
    error: errorCharacter,
  } = useQuery<CharacterI, Error>( // FIX: TODO: type is actually not needed (only issue: Error unknow or instanceof Error)
    ["getCharacter", characterId],
    () => swapi.getCharacter(Number(characterId)),
    {
      retry: false,
    }
  );

  const {
    data: planet,
    isLoading: isLoadingPlanet,
    isIdle: isIdlePlanet,
    error: errorPlanet,
  } = useQuery<PlanetI, Error>(
    ["getPlanet", character?.homeworldId],
    () => swapi.getPlanet(Number(character?.homeworldId)),
    {
      retry: false,
      enabled: !!character,
    }
  );

  return (
    <div className={styles.container}>
      <CharacterCard
        character={character}
        loading={isLoadingCharacter || isIdleCharacter}
        error={errorCharacter}
      />
      <PlanetCard
        planet={planet}
        loading={isLoadingPlanet || isIdlePlanet}
        error={errorPlanet}
      />
    </div>
  );
};

export default CharacterDetail;
