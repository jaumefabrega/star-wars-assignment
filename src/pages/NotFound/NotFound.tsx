import styles from "./notFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.error}>ERROR</h3>
        <h1 className={styles.notFound}>404 Not Found</h1>
      </div>
      <img
        src="/images/meme_404.png"
        alt="meme obi-wan"
        className={styles.image}
      />
    </div>
  );
};

export default NotFound;
