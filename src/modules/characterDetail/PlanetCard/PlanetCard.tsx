import { PlanetI } from "interfaces/interfaces";

import { Card } from "@mantine/core";
import {
  ArrowBarToDown,
  Cloud,
  CircleHalfVertical,
  Droplet,
  Planet,
  Users,
} from "tabler-icons-react";

import SimpleTable from "../SimpleTable/SimpleTable";
import ResidentsList from "./ResidentsList/ResidentsList";

import styles from "./planetCard.module.scss";

interface Props {
  planet?: PlanetI;
  loading: boolean;
  error: Error | null;
}

const PlanetCard: React.FC<Props> = ({ planet, loading, error }) => {
  const showSkeleton = !planet || loading;

  const cells = [
    {
      title: "Orbital Period",
      icon: <Planet />,
      value: planet?.orbitalPeriod,
    },
    {
      title: "Population",
      icon: <Users />,
      value: planet?.population,
    },
    {
      title: "Diameter",
      icon: <CircleHalfVertical />,
      value: planet?.diameter,
    },
    {
      title: "Climate",
      icon: <Cloud />,
      value: planet?.climate,
    },
    {
      title: "Surf. Water",
      icon: <Droplet />,
      value: planet?.surfaceWater,
    },
    {
      title: "Gravity",
      icon: <ArrowBarToDown />,
      value: planet?.gravity,
    },
  ];

  if (error) return <div>ERROR: {error.message}</div>;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.container}
    >
      <SimpleTable
        title={`Homeworld: ${planet?.name}`}
        cells={cells}
        loading={showSkeleton}
      />
      <ResidentsList residentIds={planet?.residentIds} loading={showSkeleton} />
    </Card>
  );
};

export default PlanetCard;
