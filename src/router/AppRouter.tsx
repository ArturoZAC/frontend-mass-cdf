import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../modules/auth/pages/LoginPage";
import { AppLayout } from "../shared/components/layout/AppLayout";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { ProductsPage } from "../modules/products/pages/ProductsPage";
import { StockPage } from "../modules/stock/pages/StockPage";
import { SalesPage } from "../modules/sales/pages/SalesPage";
import { ReportsPage } from "../modules/reports/pages/ReportsPage";
import { UsersPage } from "../modules/users/pages/UsersPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "stock", element: <StockPage /> },
      { path: "sales", element: <SalesPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },
]);
