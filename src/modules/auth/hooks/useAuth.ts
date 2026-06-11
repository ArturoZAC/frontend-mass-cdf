import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { type LoginFormData } from "../schemas/login.schema";
import { type RegisterFormData } from "../schemas/register.schema";
import { useAuthStore } from "../../../shared/store/auth.store";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const { setUser, setAuthStatus } = useAuthStore();
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    setAuthStatus("loading");
    setError(null);
    try {
      const res = await authApi.login({ correo: data.correo, password: data.password });
      setUser(res.data);
      navigate("/dashboard");
    } catch {
      setAuthStatus("unauthenticated");
      setError("Credenciales inválidas. Verifica tu correo y contraseña.");
    }
  };

  const register = async (data: RegisterFormData) => {
    setAuthStatus("loading");
    setError(null);
    try {
      const res = await authApi.register({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        password: data.password,
        idRol: data.idRol,
      });
      setUser(res.data);
      navigate("/dashboard");
    } catch {
      setAuthStatus("unauthenticated");
      setError("Error al registrar. Verifica los datos ingresados.");
    }
  };

  const authStatus = useAuthStore((s) => s.authStatus);
  const loading = authStatus === "loading";

  return { login, register, loading, error };
};
