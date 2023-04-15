import { useEffect } from "react";
import { Link } from "react-router-dom";

import swapi from "services/swapi";
import { getCharDetailUrl } from "utils/utils";

import styles from "./charactersCatalogue.module.scss";

const CharactersCatalogue = () => {
  useEffect(() => {
    const getCharacters = async () => {
      const characters = await swapi.getCharacters();
      console.log("PEOPLE", characters);
    };

    getCharacters();
  }, []);

  return (
    <div className={styles.container}>
      <h3>CharactersCatalogue Page</h3>
      <Link to={getCharDetailUrl(1)}>Detail example</Link>
    </div>
  );
};

export default CharactersCatalogue;
