import { z } from "zod";

export const registerSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    correo: z.string().email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmarPassword: z.string().min(6, "Mínimo 6 caracteres"),
    idRol: z.number().min(1, "Selecciona un rol"),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
