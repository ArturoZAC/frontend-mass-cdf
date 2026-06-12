import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/stock": "Stock",
  "/sales": "Sales",
  "/reports": "Reports",
  "/users": "Users",
};

export const AppLayout = () => {
  const location = useLocation();
  const currentPage = pageNames[location.pathname] ?? "Dashboard";
  const authStatus = useAuthStore((s) => s.authStatus);

  if (authStatus === "loading") return null;
  if (authStatus !== "authenticated") return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar currentPage={currentPage} />
        <main className="flex-1 p-6 bg-[#f0f2f5]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
