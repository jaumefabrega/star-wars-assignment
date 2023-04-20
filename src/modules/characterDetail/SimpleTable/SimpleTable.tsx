import { ReactNode } from "react";

import CellWithTitle from "../CellWithTitle/CellWithTitle";

import styles from "./simpleTable.module.scss";

interface Cell {
  title: string;
  icon: ReactNode;
  value?: string | number;
}

interface Props {
  title: string;
  cells: Cell[];
  loading: boolean;
}

const SimpleTable: React.FC<Props> = ({ title, cells, loading }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.characteristics}>
        {cells.map((cell, idx) => (
          <CellWithTitle
            title={cell.title}
            value={cell.value}
            icon={cell.icon}
            loading={loading}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleTable;
