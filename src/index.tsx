import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import CharactersCatalogue from "pages/CharactersCatalogue/CharactersCatalogue";
import CharacterDetail from "pages/CharacterDetail/CharacterDetail";
import NotFound from "pages/NotFound/NotFound";
import Landing from "pages/Landing/Landing";

import { urls } from "constants/constants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path={urls.LANDING} element={<Landing />} />
      <Route
        path={urls.CHARACTERS_CATALOGUE}
        element={<CharactersCatalogue />}
      />
      <Route path={urls.CHARACTER_DETAIL} element={<CharacterDetail />} />
      <Route path={urls.NOT_FOUND} element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
