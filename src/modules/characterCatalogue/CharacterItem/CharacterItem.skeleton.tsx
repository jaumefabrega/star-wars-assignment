import cn from "classnames";

import { Card, Skeleton } from "@mantine/core";

import styles from "./characterItem.module.scss";

const CharacterItemSkeleton = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={cn(styles.container, styles.skeleton)}
    >
      <div className={styles.name}>
        <Skeleton height={24.8} mt={0} width="150" radius="sm" />
      </div>
      <div className={styles.cell}>
        <Skeleton height={24.8} mt={0} width="90" radius="sm" />
      </div>
      <div className={styles.cell}>
        <Skeleton height={24.8} mt={0} width="40" radius="sm" />
      </div>
      <div className={styles.cell}>
        <Skeleton height={24.8} mt={0} width="30" radius="sm" />
      </div>
    </Card>
  );
};

export default CharacterItemSkeleton;
