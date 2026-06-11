import type { RouteObject } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ],
};
