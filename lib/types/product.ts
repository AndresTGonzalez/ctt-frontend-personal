/**
 * =============================================================================
 * ARCHIVO: lib/types/product.ts — Tipos TypeScript del dominio Producto
 * =============================================================================
 *
 * Estos tipos reflejan EXACTAMENTE la forma del JSON que devuelve FastAPI.
 * Beneficios para estudiantes:
 * - Autocompletado en el editor
 * - Errores detectados en compile-time (antes de ejecutar)
 * - Documentación viva del contrato del API
 * =============================================================================
 */

/* --- SECCIÓN 1: Entidad Product --- */
/**
 * Un producto individual.
 * Corresponde a la respuesta de GET /products/{id} y cada item del listado.
 */
export type Product = {
  /** Identificador único generado por el backend (no se envía al crear) */
  id: number;
  /** Nombre comercial del producto */
  name: string;
  /** Descripción detallada del producto */
  description: string;
  /** Precio unitario en formato numérico (ej: 19.99) */
  price: number;
  /** Unidades disponibles en inventario */
  stock: number;
  /** true = visible en catálogo, false = inactivo */
  is_active: boolean;
};

/* --- SECCIÓN 2: Respuesta paginada --- */
/**
 * Estructura de GET /products/?page=&page_size=
 * Incluye los items de la página actual + metadatos de paginación.
 */
export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

/* --- SECCIÓN 3: Input para crear/actualizar --- */
/**
 * Datos que se envían en POST y PUT (sin id).
 * Omit<Product, "id"> = todos los campos de Product excepto id.
 */
export type ProductInput = Omit<Product, "id">;
