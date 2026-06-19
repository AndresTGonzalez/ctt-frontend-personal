/**
 * =============================================================================
 * ARCHIVO: lib/validations/product.ts — Validación con Zod
 * =============================================================================
 *
 * Zod define reglas de validación que se usan en DOS lugares:
 * 1. Cliente: product-form.tsx (via zodResolver de react-hook-form)
 * 2. Servidor: actions/products.ts (via productSchema.safeParse)
 *
 * Validar en ambos lados es defensa en profundidad:
 * - Cliente: feedback instantáneo al usuario
 * - Servidor: seguridad (el cliente puede ser manipulado)
 * =============================================================================
 */

import { z } from "zod";

/* --- SECCIÓN 1: Esquema de validación --- */
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

/* --- SECCIÓN 2: Tipo inferido del esquema --- */
/**
 * z.infer extrae el tipo TypeScript automáticamente del esquema Zod.
 * Evita duplicar definiciones: el esquema ES la fuente de verdad.
 */
export type ProductFormValues = z.infer<typeof productSchema>;
