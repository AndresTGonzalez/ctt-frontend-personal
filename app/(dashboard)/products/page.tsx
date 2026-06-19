/**
 * Página de listado de productos (Server Component).
 *
 * En Next.js 16, searchParams es una Promise y debe await-arse.
 * Los datos se obtienen en el servidor y se pasan al Client Component ProductsTable.
 */
import { ProductsTable } from "@/components/products/products-table";
import { getProducts } from "@/lib/api/products";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.page_size) || 10);

  let data;
  try {
    data = await getProducts(page, pageSize);
  } catch (error) {
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
        <p className="text-sm text-muted-foreground">
          {data.total} producto{data.total !== 1 ? "s" : ""} en total
        </p>
      </div>
      <ProductsTable data={data} />
    </div>
  );
}
