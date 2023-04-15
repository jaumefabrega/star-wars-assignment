import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import BasePage from "modules/general/BasePage/BasePage";

import "./App.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BasePage>
            <Outlet />
          </BasePage>
        </MantineProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
