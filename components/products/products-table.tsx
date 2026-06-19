"use client";

/**
 * =============================================================================
 * ARCHIVO: components/products/products-table.tsx — Tabla de productos
 * =============================================================================
 *
 * Tipo: Client Component — maneja clics, diálogos y navegación de paginación
 *
 * Recibe datos del Server Component padre (products/page.tsx).
 * No hace fetch directamente: la paginación funciona cambiando la URL.
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { useState } from "react";
import { useRouter } from "next/navigation";

import { DeleteProductDialog } from "@/components/products/delete-product-dialog";
import { EditProductDialog } from "@/components/products/edit-product-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginatedProducts } from "@/lib/types/product";

/* --- SECCIÓN 2: Tipos de props --- */
type ProductsTableProps = {
  /** Objeto completo del API: items + page, page_size, total_pages, total */
  data: PaginatedProducts;
};

/* --- SECCIÓN 3: Componente tabla --- */
export function ProductsTable({ data }: ProductsTableProps) {
  const router = useRouter();

  /* --- 3.1: Estado local para controlar diálogos --- */
  /** ID del producto que se está editando (null = diálogo cerrado) */
  const [editId, setEditId] = useState<number | null>(null);

  /** Producto seleccionado para eliminar (null = diálogo cerrado) */
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  /* --- 3.2: Navegación de paginación --- */
  /**
   * Cambia de página actualizando la URL con query params.
   * Next.js re-ejecuta products/page.tsx en el servidor con los nuevos params.
   * Ejemplo: /products?page=2&page_size=10
   */
  function goToPage(page: number) {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("page_size", String(data.page_size));
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* --- SECCIÓN 4: Tabla de datos --- */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              {/* hidden md:table-cell: oculta descripción en móvil */}
              <TableHead className="hidden md:table-cell">Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No hay productos registrados.
                </TableCell>
              </TableRow>
            ) : (
              data.items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="max-w-[200px] truncate font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="hidden max-w-[250px] truncate md:table-cell">
                    {product.description}
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {/** Badge success (verde) para activo, secondary (gris) para inactivo */}
                    <Badge variant={product.is_active ? "success" : "secondary"}>
                      {product.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditId(product.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          setDeleteTarget({
                            id: product.id,
                            name: product.name,
                          })
                        }
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- SECCIÓN 5: Paginación (solo si hay más de 1 página) --- */}
      {data.total_pages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="Anterior"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (data.page > 1) goToPage(data.page - 1);
                }}
                aria-disabled={data.page <= 1}
                className={
                  data.page <= 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-2 text-sm text-muted-foreground">
                Página {data.page} de {data.total_pages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                text="Siguiente"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (data.page < data.total_pages) goToPage(data.page + 1);
                }}
                aria-disabled={data.page >= data.total_pages}
                className={
                  data.page >= data.total_pages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* --- SECCIÓN 6: Diálogos de edición y eliminación --- */}
      {/**
       * Los diálogos viven aquí (no en page.tsx) porque dependen del estado
       * editId/deleteTarget que se actualiza al hacer clic en la tabla.
       */}
      <EditProductDialog
        productId={editId}
        open={editId !== null}
        onOpenChange={(open) => {
          if (!open) setEditId(null);
        }}
      />

      <DeleteProductDialog
        productId={deleteTarget?.id ?? null}
        productName={deleteTarget?.name ?? ""}
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      />
    </div>
  );
}
