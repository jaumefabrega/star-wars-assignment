import { CharacterI, PlanetI } from "interfaces/interfaces";

import { Skeleton } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import CharacterCard from "modules/characterDetail/CharacterCard/CharacterCard";
import PlanetCard from "modules/characterDetail/PlanetCard/PlanetCard";
import swapi from "services/swapi";

import styles from "./characterDetail.module.scss";

const CharacterDetail = () => {
  const { characterId } = useParams();
  const [planetId, setPlanetId] = useState<number | null>(null);

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
      refetchOnWindowFocus: false,
      onSuccess: (char) => setPlanetId(char.homeworldId),
    }
  );

  const {
    data: planet,
    isLoading: isLoadingPlanet,
    isIdle: isIdlePlanet,
    error: errorPlanet,
  } = useQuery<PlanetI, Error>(
    ["getPlanet", planetId],
    () => swapi.getPlanet(Number(planetId)),
    {
      retry: false,
      enabled: !!planetId,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={styles.container}>
      <Helmet>
        <title>SW - {character?.name || ""}</title>
        <meta name="description" content="All the character information" />
      </Helmet>
      <h2 className={styles.name}>
        {character ? (
          `${character.name} (#${character.id})`
        ) : (
          <Skeleton height={37.2} mt={0} width="150" radius="sm" />
        )}
      </h2>
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
