import { AppShell } from "@mantine/core";

import Header from "modules/general/Header/Header";
import Footer from "modules/general/Footer/Footer";

import styles from "./basePage.module.scss";

interface Props {
  children: React.ReactNode;
}

const BasePage: React.FC<Props> = ({ children }) => {
  return (
    <AppShell
      className={styles.container}
      classNames={{ main: styles.main }}
      fixed={false}
      footer={<Footer />}
      header={<Header />}
    >
      {children}
    </AppShell>
  );
};

export default BasePage;
