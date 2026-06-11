import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../shared/store/auth.store";
import { AuthSkeleton } from "../components/AuthSeleton";

export const AuthLayout = () => {
  const authStatus = useAuthStore((s) => s.authStatus);

  if (authStatus === "authenticated") return <Navigate to="/" replace />;
  if (authStatus === "loading") return <AuthSkeleton />;

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0D2DAA] p-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#FFD101] rounded-lg">
            <span className="btn-sans text-[#B5000B] font-black text-sm">M✓</span>
          </div>
          <span className="btn-sans font-black text-white text-lg">Mass Manager</span>
        </div>

        <div>
          <h1 className="h1-white font-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Gestión inteligente para Tiendas Mass
          </h1>
          <p className="lead-white opacity-80">
            Controla tu inventario, ventas y atención al cliente desde una sola plataforma.
          </p>
        </div>

        <div className="flex gap-6">
          {["Inventario en tiempo real", "Control de ventas", "Reportes automáticos"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFD101]" />
                <span className="small-white opacity-70 text-xs">{item}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-8 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="flex items-center justify-center w-12 h-12 bg-[#FFD101] rounded-xl mb-3">
              <span className="btn-sans text-[#B5000B] font-black">M✓</span>
            </div>
            <h2 className="font-black text-[#0D2DAA]" style={{ fontFamily: "var(--font-heading)" }}>
              Mass Manager
            </h2>
            <p className="p-muted text-sm">Gestión logística y operativa</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
