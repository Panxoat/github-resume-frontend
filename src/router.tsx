import { Route } from "react-router-dom";

import { Container } from "./container";

import { MainPage } from "./page";
import { Portfolio } from "./page/portfolio";
import { Navigation } from "./page/navigation";
import { NotFoundPage } from "./page/404";

export const Router = () => {
  return (
    <>
      <Route path="/" element={<Container />}>
        <Route index element={<MainPage />} />
        <Route
          path=":id"
          element={
            <>
              <Navigation />
              <Portfolio />
            </>
          }
        />
        <Route path="404" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
};
