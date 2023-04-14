import { MantineProvider } from "@mantine/core";

import { Outlet } from "react-router-dom";

import BasePage from "modules/general/BasePage/BasePage";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BasePage>
          <Outlet />
        </BasePage>
      </MantineProvider>
    </div>
  );
};

export default App;
