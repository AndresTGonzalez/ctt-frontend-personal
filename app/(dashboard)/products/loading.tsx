/**
 * =============================================================================
 * ARCHIVO: app/(dashboard)/products/loading.tsx — UI de carga
 * =============================================================================
 *
 * Convención especial de Next.js App Router: si existe loading.tsx junto a
 * page.tsx, Next.js lo muestra automáticamente mientras page.tsx carga datos.
 *
 * Equivale a un Suspense boundary sin escribir <Suspense> manualmente.
 *
 * Tipo: Server Component
 * =============================================================================
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Placeholders que imitan el título y subtítulo de la página real */}
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />

      {/* Placeholders que imitan filas de la tabla */}
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
