import { Link } from "react-router-dom";

import { getCharDetailUrl } from "utils/utils";

import styles from "./charactersCatalogue.module.scss";

const CharactersCatalogue = () => {
  return (
    <div className={styles.container}>
      <h3>CharactersCatalogue Page</h3>
      <Link to={getCharDetailUrl(1)}>Detail example</Link>
    </div>
  );
};

export default CharactersCatalogue;
