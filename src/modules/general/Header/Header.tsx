import { Header as MantineHeader } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { List } from "tabler-icons-react";

import { urls } from "constants/constants";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <MantineHeader
      height={{ base: 50, md: 70 }}
      p="md"
      className={styles.container}
    >
      <NavLink to={urls.LANDING} className={styles.link}>
        <img
          src={"/images/rebel_alliance.svg"}
          alt="Rebel Alliance Logo"
          className={styles.image}
        />
        <div>Home</div>
      </NavLink>
      <NavLink to={urls.CHARACTERS_CATALOGUE} className={styles.link}>
        Characters
        <List />
      </NavLink>
    </MantineHeader>
  );
};

export default Header;
