"use server";

/**
 * =============================================================================
 * ARCHIVO: actions/products.ts — Server Actions del CRUD
 * =============================================================================
 *
 * 'use server' marca este archivo completo como Server Actions.
 * Estas funciones se ejecutan EXCLUSIVAMENTE en el servidor de Next.js.
 *
 * Ventajas:
 * - El navegador nunca ve la URL del API (no hay CORS)
 * - Validación con Zod antes de llamar al backend
 * - revalidatePath refresca la UI tras mutaciones
 *
 * Capa de abstracción:
 *   Client Component → Server Action (este archivo) → lib/api/products.ts → FastAPI
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { revalidatePath } from "next/cache";

import {
  createProduct as apiCreateProduct,
  deleteProduct as apiDeleteProduct,
  getProductById as apiGetProductById,
  updateProduct as apiUpdateProduct,
} from "@/lib/api/products";
import type { Product, ProductInput } from "@/lib/types/product";
import { productSchema } from "@/lib/validations/product";

/* --- SECCIÓN 2: Tipo de respuesta unificado --- */
/**
 * Todas las acciones devuelven este formato para manejar éxito/error
 * de forma consistente en los Client Components (toast + lógica condicional).
 */
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/* --- SECCIÓN 3: READ — Obtener un producto por ID --- */
/**
 * Usado al abrir EditProductDialog.
 * Equivalente cURL: GET http://localhost:8000/products/{id}
 */
export async function getProductById(
  id: number
): Promise<ActionResult<Product>> {
  try {
    const data = await apiGetProductById(id);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Error al obtener el producto",
    };
  }
}

/* --- SECCIÓN 4: CREATE — Crear producto --- */
/**
 * Equivalente cURL: POST http://localhost:8000/products/
 * Tras crear, revalidatePath('/products') regenera el listado con el nuevo dato.
 */
export async function createProduct(
  input: ProductInput
): Promise<ActionResult<Product>> {
  /** Validación en servidor (doble capa: también valida el formulario en cliente) */
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  try {
    const data = await apiCreateProduct(parsed.data);
    revalidatePath("/products");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Error al crear el producto",
    };
  }
}

/* --- SECCIÓN 5: UPDATE — Actualizar producto --- */
/**
 * Equivalente cURL: PUT http://localhost:8000/products/{id}
 */
export async function updateProduct(
  id: number,
  input: ProductInput
): Promise<ActionResult<Product>> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  try {
    const data = await apiUpdateProduct(id, parsed.data);
    revalidatePath("/products");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Error al actualizar el producto",
    };
  }
}

/* --- SECCIÓN 6: DELETE — Eliminar producto --- */
/**
 * Equivalente cURL: DELETE http://localhost:8000/products/{id}
 */
export async function deleteProduct(
  id: number
): Promise<ActionResult<boolean>> {
  try {
    const data = await apiDeleteProduct(id);
    revalidatePath("/products");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Error al eliminar el producto",
    };
  }
}
