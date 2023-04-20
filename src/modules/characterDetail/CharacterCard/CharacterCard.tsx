import { CharacterI } from "interfaces/interfaces";

import { Card } from "@mantine/core";
import {
  Alien,
  CalendarEvent,
  Car,
  Eye,
  GenderBigender,
  MoodBoy,
  Movie,
  Ruler3,
  Scale,
} from "tabler-icons-react";

import SimpleTable from "../SimpleTable/SimpleTable";

import styles from "./characterCard.module.scss";

interface Props {
  character?: CharacterI;
  loading: boolean;
  error: Error | null;
}

const CharacterCard: React.FC<Props> = ({ character, loading, error }) => {
  const showSkeleton = !character || loading;

  const cells = [
    {
      title: "Gender",
      icon: <GenderBigender />,
      value: character?.gender,
    },
    {
      title: "Birthday",
      icon: <CalendarEvent />,
      value: character?.birthYearSW,
    },
    {
      title: "Mass",
      icon: <Scale />,
      value: character?.mass,
    },
    {
      title: "Height",
      icon: <Ruler3 />,
      value: character?.height,
    },
    {
      title: "Eye Color",
      icon: <Eye />,
      value: character?.eyeColor,
    },
    {
      title: "Hair Color",
      icon: <MoodBoy />,
      value: character?.hairColor,
    },
    {
      title: "Species (qty)",
      icon: <Alien />,
      value: character?.speciesIds.length,
    },
    {
      title: "Movies (qty)",
      icon: <Movie />,
      value: character?.filmIds.length,
    },
    {
      title: "Vehicles (qty)",
      icon: <Car />,
      value: character?.vehicleIds.length,
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
        title="Character Details"
        cells={cells}
        loading={showSkeleton}
      />
    </Card>
  );
};

export default CharacterCard;
