import { Footer as MantineFooter } from "@mantine/core";

import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <MantineFooter height={60} p="md">
      Made with &#x2764; by Jaume
    </MantineFooter>
  );
};

export default Footer;
