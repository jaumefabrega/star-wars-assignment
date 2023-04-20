import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

import { urls } from "constants/constants";

import styles from "./landing.module.scss";

const Landing = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.xWings}>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
        <li>
          <div />
        </li>
      </ul>
      <div className={styles.imageWrapper}>
        <img
          src={"/images/star_wars_letters.svg"}
          alt="Star Wars"
          className={styles.image}
        />
      </div>
      <Link to={urls.CHARACTERS_CATALOGUE} className={styles.link}>
        <Button onClick={() => null} variant="filled" size="sm">
          Browse Characters
        </Button>
      </Link>
    </div>
  );
};

export default Landing;
