import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../shared/components/layout/AppLayout";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
// import { StockPage } from "../modules/stock/pages/StockPage";
import { SalesPage } from "../modules/sales/pages/SalesPage";
import { ReportsPage } from "../modules/reports/pages/ReportsPage";
import { UsersPage } from "../modules/users/pages/UsersPage";
// import { ListaProductosPage } from "../modules/products/pages/lista-productos/ListaProductosPage";
import { productsRoutes } from "../modules/products/routes/ProductsRoutes";
import { stockRoutes } from "../modules/stock/routes/StockRoutes";
import { kardexRoutes } from "../modules/kardex/routes/KardexRoutes";
import { authRoutes } from "../modules/auth/routes/AuthRoutes";

export const AppRouter = createBrowserRouter([
  authRoutes,
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },

      // { path: "products", element: <ListaProductosPage /> },
      productsRoutes,
      // { path: "stock", element: <StockPage /> },
      stockRoutes,
      kardexRoutes,
      { path: "sales", element: <SalesPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
