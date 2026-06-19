/**
 * Esquema de validación Zod para formularios de producto.
 *
 * Zod valida los datos ANTES de enviarlos al API, mostrando errores
 * amigables en el formulario sin hacer una petición HTTP innecesaria.
 */
import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  description: z.string().max(500, "Máximo 500 caracteres"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  is_active: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
