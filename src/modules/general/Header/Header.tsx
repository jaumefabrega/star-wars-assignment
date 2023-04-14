import { Header as MantineHeader } from "@mantine/core";
import { NavLink } from "react-router-dom";

import { urls } from "constants/constants";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <MantineHeader
      height={{ base: 50, md: 70 }}
      p="md"
      style={{ display: "flex", justifyContent: "space-between" }}
      fixed
    >
      <NavLink to={urls.LANDING}>Home</NavLink>
      <NavLink to={urls.CHARACTERS_CATALOGUE}>List</NavLink>
    </MantineHeader>
  );
};

export default Header;
