import cn from "classnames";

import { Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";

import { getCharDetailUrl } from "utils/utils";

import styles from "./residentsList.module.scss";

interface Props {
  residentIds?: number[];
  currentCharacterId?: number;
  loading: boolean;
}

const ResidentsList: React.FC<Props> = ({
  residentIds,
  currentCharacterId,
  loading,
}) => {
  const showSkeleton = loading || !residentIds;

  return (
    <div className={styles.container}>
      <div>Residents List:</div>
      <div className={styles.links}>
        {showSkeleton ? (
          <Skeleton height={18.8} mt={6} width="70" radius="sm" />
        ) : (
          residentIds.map((residentId) => (
            <Link
              to={getCharDetailUrl(residentId)}
              className={cn({
                [styles.current]: residentId === currentCharacterId,
              })}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              key={residentId}
            >
              {residentId}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ResidentsList;
