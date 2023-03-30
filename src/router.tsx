import { Route } from "react-router-dom";

import { Container } from "./container";

import { MainPage } from "./page";

export const Router = () => {
  return (
    <Route path="/" element={<Container />}>
      <Route index element={<MainPage />} />
    </Route>
  );
};
