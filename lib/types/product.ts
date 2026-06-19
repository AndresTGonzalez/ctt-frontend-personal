/**
 * Tipos TypeScript para el módulo de productos.
 *
 * Estos tipos reflejan exactamente la forma del JSON que devuelve el API FastAPI.
 * Usarlos en toda la app garantiza autocompletado y detección de errores en compile-time.
 */

/** Un producto individual tal como lo devuelve GET /products/{id} */
export type Product = {
  /** Identificador único generado por el backend */
  id: number;
  /** Nombre comercial del producto */
  name: string;
  /** Descripción detallada */
  description: string;
  /** Precio unitario (número decimal) */
  price: number;
  /** Unidades disponibles en inventario */
  stock: number;
  /** Si el producto está visible/activo en el catálogo */
  is_active: boolean;
};

/** Respuesta paginada de GET /products/?page=&page_size= */
export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

/** Datos necesarios para crear o actualizar un producto (sin id) */
export type ProductInput = Omit<Product, "id">;
