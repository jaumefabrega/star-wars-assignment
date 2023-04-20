import { ReactNode } from "react";

import { Skeleton } from "@mantine/core";

import styles from "./cellWithTitle.module.scss";

interface Props {
  title: string;
  value?: string | number;
  icon: ReactNode;
  loading: boolean;
}

const CellWithTitle: React.FC<Props> = ({ title, value, icon, loading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {icon}
        <div>{title}</div>
      </div>
      <div className={styles.value}>
        {!loading ? (
          value
        ) : (
          <Skeleton height={18.8} mt={6} width="30" radius="sm" />
        )}
      </div>
    </div>
  );
};

export default CellWithTitle;
