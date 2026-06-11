import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IconMail, IconLock, IconEye, IconEyeOff, IconUser } from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";
import { registerSchema, type RegisterFormData } from "../../../schemas/register.schema";

const roles = [
  { label: "Administrador", value: 1 },
  { label: "Cajero", value: 2 },
  { label: "Almacén", value: 3 },
];

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { idRol: 1 },
  });

  const selectedRol = watch("idRol");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h3
          className="font-black text-[#1a1a1a] mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Crear cuenta
        </h3>
        <p className="p-muted text-sm">Registra un nuevo empleado en el sistema</p>
      </div>

      <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
        {/* Rol */}
        <div className="flex flex-col gap-1.5">
          <label className="h1-badge text-[10px] text-gray-400">ROL DE ACCESO</label>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {roles.map((rol) => (
              <button
                key={rol.value}
                type="button"
                onClick={() => setValue("idRol", rol.value)}
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

        {/* Nombre + Apellido */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="h1-badge text-[10px] text-gray-400">NOMBRE</label>
            <div
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
              ${errors.nombre ? "border-red-400 bg-red-50" : "border-gray-200 focus-within:border-[#0D2DAA]"}`}
            >
              <IconUser size={16} className="text-gray-400 shrink-0" />
              <input
                {...register("nombre")}
                placeholder="Arturo"
                className="outline-none text-sm w-full bg-transparent placeholder:text-gray-400"
              />
            </div>
            {errors.nombre && <span className="text-xs text-red-500">{errors.nombre.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="h1-badge text-[10px] text-gray-400">APELLIDO</label>
            <div
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
              ${errors.apellido ? "border-red-400 bg-red-50" : "border-gray-200 focus-within:border-[#0D2DAA]"}`}
            >
              <IconUser size={16} className="text-gray-400 shrink-0" />
              <input
                {...register("apellido")}
                placeholder="Araujo"
                className="outline-none text-sm w-full bg-transparent placeholder:text-gray-400"
              />
            </div>
            {errors.apellido && (
              <span className="text-xs text-red-500">{errors.apellido.message}</span>
            )}
          </div>
        </div>

        {/* Correo */}
        <div className="flex flex-col gap-1.5">
          <label className="h1-badge text-[10px] text-gray-400">CORREO</label>
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
            ${errors.correo ? "border-red-400 bg-red-50" : "border-gray-200 focus-within:border-[#0D2DAA]"}`}
          >
            <IconMail size={16} className="text-gray-400 shrink-0" />
            <input
              {...register("correo")}
              type="email"
              placeholder="correo@tiendamass.pe"
              className="outline-none text-sm w-full bg-transparent placeholder:text-gray-400"
            />
          </div>
          {errors.correo && <span className="text-xs text-red-500">{errors.correo.message}</span>}
        </div>

        {/* Password + Confirmar */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="h1-badge text-[10px] text-gray-400">CONTRASEÑA</label>
            <div
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
              ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus-within:border-[#0D2DAA]"}`}
            >
              <IconLock size={16} className="text-gray-400 shrink-0" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="outline-none text-sm w-full bg-transparent placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
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

          <div className="flex flex-col gap-1.5">
            <label className="h1-badge text-[10px] text-gray-400">CONFIRMAR</label>
            <div
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors
              ${errors.confirmarPassword ? "border-red-400 bg-red-50" : "border-gray-200 focus-within:border-[#0D2DAA]"}`}
            >
              <IconLock size={16} className="text-gray-400 shrink-0" />
              <input
                {...register("confirmarPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="outline-none text-sm w-full bg-transparent placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="cursor-pointer"
              >
                {showConfirm ? (
                  <IconEyeOff size={16} className="text-gray-400" />
                ) : (
                  <IconEye size={16} className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmarPassword && (
              <span className="text-xs text-red-500">{errors.confirmarPassword.message}</span>
            )}
          </div>
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
          className="w-full py-3 rounded-lg bg-[#FFD101] hover:bg-[#e6bc00] transition-colors font-bold text-sm text-[#1a1a1a] cursor-pointer disabled:opacity-60"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {loading ? "Registrando..." : "Crear cuenta →"}
        </button>

        {/* Link login */}
        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#0D2DAA] font-semibold hover:underline cursor-pointer"
          >
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </div>
  );
};
