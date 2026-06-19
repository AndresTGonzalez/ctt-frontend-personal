/**
 * =============================================================================
 * ARCHIVO: lib/api/products.ts — Cliente HTTP del servidor
 * =============================================================================
 *
 * Capa más baja de comunicación con FastAPI. Cada función = un endpoint cURL.
 *
 * IMPORTANTE: Solo se llama desde el SERVIDOR (Server Components o Server Actions).
 * La variable API_BASE_URL no usa NEXT_PUBLIC_, así que el navegador nunca la ve.
 *
 * Usa fetch nativo de Node.js con cache: 'no-store' para datos siempre frescos.
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones y configuración --- */
import type {
  PaginatedProducts,
  Product,
  ProductInput,
} from "@/lib/types/product";

/** URL base del API, definida en .env.local (servidor solamente) */
const API_BASE_URL =
  process.env.API_BASE_URL ?? "http://localhost:8000";

/* --- SECCIÓN 2: Helper de respuestas HTTP --- */
/**
 * Centraliza el manejo de errores HTTP.
 * Si response.ok es false, lanza Error con status y cuerpo de la respuesta.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Error ${response.status}: ${body || response.statusText}`
    );
  }
  return response.json() as Promise<T>;
}

/* --- SECCIÓN 3: GET listado paginado --- */
/**
 * curl -X GET 'http://localhost:8000/products/?page=1&page_size=10'
 * Usado por: products/page.tsx (Server Component)
 */
export async function getProducts(
  page = 1,
  pageSize = 10
): Promise<PaginatedProducts> {
  const url = new URL(`${API_BASE_URL}/products/`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("page_size", String(pageSize));

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  return handleResponse<PaginatedProducts>(response);
}

/* --- SECCIÓN 4: GET un producto --- */
/**
 * curl -X GET 'http://localhost:8000/products/{id}'
 * Usado por: getProductById Server Action → EditProductDialog
 */
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  return handleResponse<Product>(response);
}

/* --- SECCIÓN 5: POST crear producto --- */
/**
 * curl -X POST 'http://localhost:8000/products/' -d '{ name, description, ... }'
 * Usado por: createProduct Server Action → /products/new
 */
export async function createProduct(data: ProductInput): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Product>(response);
}

/* --- SECCIÓN 6: PUT actualizar producto --- */
/**
 * curl -X PUT 'http://localhost:8000/products/{id}' -d '{ name, description, ... }'
 * Usado por: updateProduct Server Action → EditProductDialog
 */
export async function updateProduct(
  id: number,
  data: ProductInput
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Product>(response);
}

/* --- SECCIÓN 7: DELETE eliminar producto --- */
/**
 * curl -X DELETE 'http://localhost:8000/products/{id}'
 * Usado por: deleteProduct Server Action → DeleteProductDialog
 */
export async function deleteProduct(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { accept: "application/json" },
  });

  return handleResponse<boolean>(response);
}
