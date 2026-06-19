/**
 * =============================================================================
 * ARCHIVO: app/(dashboard)/products/page.tsx — Listado de productos
 * =============================================================================
 *
 * Ruta: /products
 * Tipo: Server Component (async) — los datos se obtienen en el SERVIDOR.
 *
 * Flujo:
 * 1. Lee page y page_size de la URL (?page=2&page_size=10)
 * 2. Llama getProducts() → GET al API FastAPI
 * 3. Pasa el resultado a ProductsTable (Client Component)
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { ProductsTable } from "@/components/products/products-table";
import { getProducts } from "@/lib/api/products";

/* --- SECCIÓN 2: Tipos de props --- */
/**
 * En Next.js 16, searchParams es una Promise (cambio respecto a v14).
 * Contiene los query params de la URL como strings.
 */
type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
  }>;
};

/* --- SECCIÓN 3: Componente de página --- */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  /* --- 3.1: Leer y parsear parámetros de paginación de la URL --- */
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.page_size) || 10);

  /* --- 3.2: Obtener datos del API en el servidor --- */
  let data;
  try {
    data = await getProducts(page, pageSize);
  } catch (error) {
    /** Si el backend no responde, mostramos un mensaje de error amigable */
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
        <p className="text-destructive">
          Error al cargar productos:{" "}
          {error instanceof Error ? error.message : "Error desconocido"}
        </p>
        <p className="text-sm text-muted-foreground">
          Verifica que el backend FastAPI esté corriendo en{" "}
          {process.env.API_BASE_URL ?? "http://localhost:8000"}
        </p>
      </div>
    );
  }

  /* --- 3.3: Renderizar encabezado + tabla con los datos --- */
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
        <p className="text-sm text-muted-foreground">
          {data.total} producto{data.total !== 1 ? "s" : ""} en total
        </p>
      </div>

      {/**
       * ProductsTable es Client Component: maneja clics, diálogos y paginación.
       * Recibe el objeto PaginatedProducts completo (items + metadatos de página).
       */}
      <ProductsTable data={data} />
    </div>
  );
}
