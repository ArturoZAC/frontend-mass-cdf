import { RouterProvider } from "react-router-dom";
import { AppRouter } from "../router/AppRouter";

export const AppMass = () => {
  return <RouterProvider router={AppRouter} />;
};
