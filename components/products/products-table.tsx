"use client";

/**
 * Tabla interactiva de productos con paginación y acciones CRUD.
 *
 * Client Component porque maneja:
 * - Estado de diálogos (editar / eliminar)
 * - Navegación de paginación vía router.push()
 *
 * Recibe los datos iniciales del Server Component padre (products/page.tsx).
 */
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

type ProductsTableProps = {
  data: PaginatedProducts;
};

export function ProductsTable({ data }: ProductsTableProps) {
  const router = useRouter();
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function goToPage(page: number) {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("page_size", String(data.page_size));
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
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
