import { Route } from "react-router-dom";

import { Container } from "./container";

import { MainPage } from "./page";
import { Portfolio } from "./page/portfolio";

export const Router = () => {
  return (
    <Route path="/" element={<Container />}>
      <Route index element={<MainPage />} />
      <Route path=":id" element={<Portfolio />} />
    </Route>
  );
};
