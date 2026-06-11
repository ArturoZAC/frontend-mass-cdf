import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  codigo: z.string().min(1, "El código SKU es obligatorio"),
  precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  stockMinimo: z.coerce.number().min(0, "El stock mínimo no puede ser negativo"),
  idCategoria: z.coerce.number().min(1, "Selecciona una categoría"),
  idProveedor: z.coerce.number().optional(),
  imagen: z.string().optional(),
});

export type ProductoFormData = z.infer<typeof productoSchema>;
