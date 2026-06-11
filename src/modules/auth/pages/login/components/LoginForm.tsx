import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../../../schemas/login.schema";

const roles = [
  { label: "Administrador", value: "ADMINISTRADOR" },
  { label: "Cajero", value: "CAJERO" },
  { label: "Almacén", value: "ALMACEN" },
];

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rol: "ADMINISTRADOR" },
  });

  const selectedRol = watch("rol");

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h3
          className="font-black text-[#1a1a1a] mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Iniciar Sesión
        </h3>
        <p className="p-muted text-sm">Ingresa tus credenciales para continuar</p>
      </div>

      <form onSubmit={handleSubmit(login)} className="space-y-5">
        {/* Rol de acceso */}
        <div className="flex flex-col gap-1.5">
          <label className="h1-badge text-[10px] text-gray-400">ROL DE ACCESO</label>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {roles.map((rol) => (
              <button
                key={rol.value}
                type="button"
                onClick={() => setValue("rol", rol.value)}
                className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer
                  ${
                    selectedRol === rol.value
                      ? "bg-[#FFD101] text-[#1a1a1a] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {rol.label}
              </button>
            ))}
          </div>
        </div>

        {/* Correo */}
        <div className="flex flex-col gap-1.5">
          <label className="h1-badge text-[10px] text-gray-400">CORREO</label>
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
            ${errors.correo ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus-within:border-[#0D2DAA]"}`}
          >
            <IconMail size={16} className="text-gray-400 shrink-0" />
            <input
              {...register("correo")}
              type="email"
              placeholder="correo@tiendamass.pe"
              className="outline-none text-sm w-full bg-transparent text-[#1a1a1a] placeholder:text-gray-400"
            />
          </div>
          {errors.correo && <span className="text-xs text-red-500">{errors.correo.message}</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="h1-badge text-[10px] text-gray-400">CONTRASEÑA</label>
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
            ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus-within:border-[#0D2DAA]"}`}
          >
            <IconLock size={16} className="text-gray-400 shrink-0" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="outline-none text-sm w-full bg-transparent text-[#1a1a1a] placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer shrink-0"
            >
              {showPassword ? (
                <IconEyeOff size={16} className="text-gray-400" />
              ) : (
                <IconEye size={16} className="text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* Error global */}
        {error && (
          <div className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-200">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#FFD101] hover:bg-[#e6bc00] transition-colors font-bold text-sm text-[#1a1a1a] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {loading ? "Ingresando..." : "Iniciar Sesión →"}
        </button>

        {/* Link register */}
        <p className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#0D2DAA] font-semibold hover:underline cursor-pointer"
          >
            Regístrate aquí
          </button>
        </p>
      </form>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400">Sistemas Operativos</span>
        </div>
        <span className="text-xs text-gray-400">v4.2.0-stable</span>
      </div>
    </div>
  );
};
