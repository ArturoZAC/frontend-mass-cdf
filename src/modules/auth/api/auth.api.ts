import { api } from "../../../shared/api/axios.instance";

export interface LoginPayload {
  correo: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  idRol: number;
}

export interface AuthResponse {
  token: string;
  correo: string;
  nombre: string;
  rol: string;
}

export const authApi = {
  login: (payload: LoginPayload) => api.post<AuthResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) => api.post<AuthResponse>("/auth/register", payload),
};
