/**
 * Estado de carga para la página de productos.
 *
 * Next.js muestra este archivo automáticamente mientras
 * el Server Component products/page.tsx está cargando datos.
 */
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      <div className="rounded-lg border">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
