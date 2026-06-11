import { ListaProductosPage } from "../pages/lista-productos/ListaProductosPage";
import { CrearProductoPage } from "../pages/crear-producto/CrearProductoPage";
import { EditarProductoPage } from "../pages/editar-producto/EditarProductoPage";
import type { RouteObject } from "react-router-dom";

export const productsRoutes: RouteObject = {
  path: "products",
  children: [
    { index: true, element: <ListaProductosPage /> },
    { path: "crear", element: <CrearProductoPage /> },
    { path: "editar/:id", element: <EditarProductoPage /> },
  ],
};
