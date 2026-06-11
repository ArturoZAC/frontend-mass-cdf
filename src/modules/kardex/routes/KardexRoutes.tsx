import type { RouteObject } from "react-router-dom";
import { ListaKardexPage } from "../pages/lista-kardex/ListaKardexPage";

export const kardexRoutes: RouteObject = {
  path: "kardex",
  element: <ListaKardexPage />,
};
