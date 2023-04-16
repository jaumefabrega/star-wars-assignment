import { CharacterI } from "interfaces/interfaces";

import { Link } from "react-router-dom";

import { getCharDetailUrl } from "utils/utils";

import styles from "./characterItem.module.scss";

interface Props {
  character: CharacterI;
}

const CharacterItem: React.FC<Props> = ({ character }) => {
  return (
    <Link to={getCharDetailUrl(character.id)} key={character.id}>
      <div className={styles.container}>
        <div>{character.name}</div>
        <div>{character.gender}</div>
        <div>{character.height}</div>
        <div>{character.mass}</div>
        <div>{character.eyeColor}</div>
      </div>
    </Link>
  );
};

export default CharacterItem;
