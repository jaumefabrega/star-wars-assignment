import styles from "./headsHeading.module.scss";

const HeadsHeading = () => {
  return (
    <div className={styles.container}>
      <img src="/images/head_trooper.png" alt="stormtrooper" />
      <img src="/images/head_c3po.png" alt="C3PO" />
      <img src="/images/head_vader.png" alt="dart vader" />
      <img src="/images/head_boba.png" alt="boba feet" />
    </div>
  );
};

export default HeadsHeading;
