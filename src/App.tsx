import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import BasePage from "modules/general/BasePage/BasePage";
import OfflineIndicator from "modules/general/OfflineIndicator/OfflineIndicator";
import ScrollToTop from "modules/general/ScrollToToop/ScrollToTop";

import "./App.css";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <HelmetProvider>
        <OfflineIndicator />
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <BasePage>
              <Outlet />
            </BasePage>
          </MantineProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
