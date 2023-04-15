import { CharacterI } from "interfaces/interfaces";

import styles from "./characterCard.module.scss";

interface Props {
  character?: CharacterI;
  loading: boolean;
  error: Error | null;
}

const CharacterCard: React.FC<Props> = ({ character, loading, error }) => {
  if (loading || !character) return <div>Loading...</div>;
  if (error) return <div>ERROR: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h3>Character</h3>
      <div>{character.name}</div>
      <div>{character.gender}</div>
      <div>{character.height}</div>
      <div>{character.mass}</div>
      <div>{character.eyeColor}</div>
    </div>
  );
};

export default CharacterCard;
