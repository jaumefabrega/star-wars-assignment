import { useEffect, useState } from "react";

import styles from "./offlineIndicator.module.scss";

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false);
  const offlineListener = () => {
    setIsOffline(!navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("offline", offlineListener);
    window.addEventListener("online", offlineListener);
    return () => {
      window.removeEventListener("offline", offlineListener);
      window.removeEventListener("online", offlineListener);
    };
  }, []);

  if (isOffline || !navigator.onLine) {
    return (
      <div className={styles.container}>
        You're offline. Data might be stale or unavailable
      </div>
    );
  }
  return null;
};

export default OfflineIndicator;
