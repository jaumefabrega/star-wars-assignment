import { useEffect } from "react";

import swapi from "services/swapi";

import styles from "./characterDetail.module.scss";

const CharacterDetail = () => {
  useEffect(() => {
    const getCharacter = async () => {
      const character = await swapi.getCharacter(1);
      console.log("Character:", character);
    };

    const getPlanet = async () => {
      const planet = await swapi.getPlanet(1);
      console.log("Planet", planet);
    };

    getCharacter();
    getPlanet();
  }, []);

  return (
    <div className={styles.container}>
      <h3>CharactersDetail Page</h3>
    </div>
  );
};

export default CharacterDetail;
