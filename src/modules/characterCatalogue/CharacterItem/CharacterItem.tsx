import { CharacterI } from "interfaces/interfaces";

import { Card } from "@mantine/core";
import { Link } from "react-router-dom";
import { Eye, Ruler3, Scale } from "tabler-icons-react";

import { getCharDetailUrl } from "utils/utils";

import styles from "./characterItem.module.scss";

interface Props {
  character: CharacterI;
}

const CharacterItem: React.FC<Props> = ({ character }) => {
  return (
    <Link to={getCharDetailUrl(character.id)}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.container}
      >
        <div className={styles.name}>{character.name}</div>
        <div className={styles.cell}>
          <Eye />
          <div className={styles.title}>Eye Color: </div>
          <div>{character.eyeColor}</div>
        </div>
        <div className={styles.cell}>
          <Scale />
          <div className={styles.title}>Mass: </div>
          <div>{character.mass}</div>
        </div>
        <div className={styles.cell}>
          <Ruler3 />
          <div className={styles.title}>Height: </div>
          <div>{character.height}</div>
        </div>
      </Card>
    </Link>
  );
};

export default CharacterItem;
