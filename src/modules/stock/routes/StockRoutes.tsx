import { ListaStockPage } from "../pages/lista-stock/ListaStockPage";
import type { RouteObject } from "react-router-dom";

export const stockRoutes: RouteObject = {
  path: "stock",
  children: [{ index: true, element: <ListaStockPage /> }],
};
