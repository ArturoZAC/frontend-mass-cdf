import { z } from "zod";

export const loginSchema = z.object({
  correo: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  rol: z.string().min(1, "Selecciona un rol"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
