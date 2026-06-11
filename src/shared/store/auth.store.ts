import { create } from "zustand";

interface AuthUser {
  token: string;
  correo: string;
  nombre: string;
  rol: string;
}

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthStore {
  user: AuthUser | null;
  authStatus: AuthStatus;
  setUser: (user: AuthUser) => void;
  setAuthStatus: (status: AuthStatus) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: (() => {
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");
    const correo = localStorage.getItem("correo");
    const rol = localStorage.getItem("rol");
    if (token && nombre && correo && rol) {
      return { token, nombre, correo, rol };
    }
    return null;
  })(),

  authStatus: localStorage.getItem("token") ? "authenticated" : "unauthenticated",

  setUser: (user) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("nombre", user.nombre);
    localStorage.setItem("correo", user.correo);
    localStorage.setItem("rol", user.rol);
    set({ user, authStatus: "authenticated" });
  },

  setAuthStatus: (status) => set({ authStatus: status }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.removeItem("rol");
    set({ user: null, authStatus: "unauthenticated" });
  },
}));
