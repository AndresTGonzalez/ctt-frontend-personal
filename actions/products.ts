"use server";

/**
 * Server Actions para el CRUD de productos.
 *
 * Las Server Actions son funciones marcadas con 'use server' que se ejecutan
 * exclusivamente en el servidor de Next.js. El navegador nunca ve la URL del API
 * ni necesita configurar CORS.
 *
 * Tras cada mutación llamamos revalidatePath('/products') para que Next.js
 * regenere la página de listado con datos actualizados.
 */
import { revalidatePath } from "next/cache";

import {
  createProduct as apiCreateProduct,
  deleteProduct as apiDeleteProduct,
  getProductById as apiGetProductById,
  updateProduct as apiUpdateProduct,
} from "@/lib/api/products";
import type { Product, ProductInput } from "@/lib/types/product";
import { productSchema } from "@/lib/validations/product";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Obtiene un producto por ID (usado al abrir el diálogo de edición).
 * Equivalente a: curl GET http://localhost:8000/products/{id}
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

/**
 * Crea un producto nuevo.
 * Equivalente a: curl -X POST http://localhost:8000/products/
 */
export async function createProduct(
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

/**
 * Actualiza un producto existente.
 * Equivalente a: curl -X PUT http://localhost:8000/products/{id}
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

/**
 * Elimina un producto.
 * Equivalente a: curl -X DELETE http://localhost:8000/products/{id}
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
