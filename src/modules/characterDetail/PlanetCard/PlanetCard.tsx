import { PlanetI } from "interfaces/interfaces";

import { Link } from "react-router-dom";

import { urls } from "constants/constants";

import styles from "./planetCard.module.scss";

interface Props {
  planet?: PlanetI;
  loading: boolean;
  error: Error | null;
}

const PlanetCard: React.FC<Props> = ({ planet, loading, error }) => {
  if (loading || !planet) return <div>Loading...</div>;
  if (error) return <div>ERROR: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h3>Homeworld</h3>
      <div>{planet.name}</div>
      <div>{planet.population}</div>
      <div>{planet.terrain}</div>
      <div>{planet.gravity}</div>
      <div className={styles.residentsList}>
        {planet.residentIds.map((residentId) => (
          <Link
            to={urls.CHARACTER_DETAIL.replace(
              ":characterId",
              String(residentId)
            )}
            key={residentId}
          >
            {residentId}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlanetCard;
