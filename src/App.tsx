import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import BasePage from "modules/general/BasePage/BasePage";
import OfflineIndicator from "modules/general/OfflineIndicator/OfflineIndicator";
import ScrollToTop from "modules/general/ScrollToToop/ScrollToTop";

import "./App.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <OfflineIndicator />
      <ScrollToTop />
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
