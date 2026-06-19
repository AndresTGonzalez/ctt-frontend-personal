/**
 * Cliente HTTP del servidor para el recurso /products.
 *
 * Estas funciones encapsulan los cURL del API FastAPI.
 * Solo se llaman desde el servidor (Server Components o Server Actions),
 * por eso la URL del API no se expone al navegador.
 */
import type {
  PaginatedProducts,
  Product,
  ProductInput,
} from "@/lib/types/product";

const API_BASE_URL =
  process.env.API_BASE_URL ?? "http://localhost:8000";

/**
 * Lanza un error descriptivo si la respuesta HTTP no es exitosa.
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

/** GET /products/?page=&page_size= — Listado paginado */
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

/** GET /products/{id} — Obtener un producto por ID */
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  return handleResponse<Product>(response);
}

/** POST /products/ — Crear un producto nuevo */
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

/** PUT /products/{id} — Actualizar un producto existente */
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

/** DELETE /products/{id} — Eliminar un producto */
export async function deleteProduct(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { accept: "application/json" },
  });

  return handleResponse<boolean>(response);
}
