"use client";

/**
 * =============================================================================
 * ARCHIVO: components/products/edit-product-dialog.tsx — Editar producto
 * =============================================================================
 *
 * Tipo: Client Component — modal interactivo con carga async de datos
 *
 * Flujo educativo:
 * 1. Usuario clic "Editar" → ProductsTable setea editId → open=true
 * 2. useEffect dispara GET getProductById(id) → muestra Skeleton
 * 3. Datos llegan → ProductForm se renderiza precargado
 * 4. Usuario guarda → updateProduct (PUT) → toast + cierra diálogo
 *
 * ¿Por qué GET al abrir y no usar datos de la tabla?
 * Para obtener datos FRESCOS del servidor (otro usuario pudo haber editado).
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { getProductById, updateProduct } from "@/actions/products";
import { ProductForm } from "@/components/products/product-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductInput } from "@/lib/types/product";

/* --- SECCIÓN 2: Tipos de props --- */
type EditProductDialogProps = {
  productId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/* --- SECCIÓN 3: Componente diálogo --- */
export function EditProductDialog({
  productId,
  open,
  onOpenChange,
}: EditProductDialogProps) {
  /* --- 3.1: Estado interno --- */
  /** true mientras se ejecuta el GET del producto */
  const [isLoading, setIsLoading] = useState(false);

  /** Datos del producto sin id, listos para precargar el formulario */
  const [defaultValues, setDefaultValues] = useState<ProductInput | null>(null);

  /** isPending=true mientras se ejecuta el PUT (updateProduct) */
  const [isPending, startTransition] = useTransition();

  /* --- 3.2: Efecto — cargar producto al abrir el diálogo --- */
  useEffect(() => {
    /** Si el diálogo está cerrado, limpiamos y no hacemos fetch */
    if (!open || productId === null) {
      setDefaultValues(null);
      return;
    }

    /**
     * Bandera cancelled evita actualizar estado si el usuario cierra
     * el diálogo antes de que termine el GET (race condition).
     */
    let cancelled = false;

    async function loadProduct() {
      setIsLoading(true);
      const result = await getProductById(productId!);

      if (cancelled) return;

      if (result.success) {
        /** Separamos id del resto: el formulario solo necesita ProductInput (sin id) */
        const { id: _, ...input } = result.data;
        setDefaultValues(input);
      } else {
        toast.error(result.error);
        onOpenChange(false);
      }

      setIsLoading(false);
    }

    loadProduct();

    /** Cleanup: marca cancelled=true si el efecto se re-ejecuta o desmonta */
    return () => {
      cancelled = true;
    };
  }, [open, productId, onOpenChange]);

  /* --- 3.3: Handler — guardar cambios (PUT) --- */
  async function handleSubmit(data: ProductInput) {
    if (productId === null) return;

    return new Promise<void>((resolve) => {
      startTransition(async () => {
        const result = await updateProduct(productId, data);

        if (result.success) {
          toast.success("Producto actualizado correctamente");
          onOpenChange(false);
        } else {
          toast.error(result.error);
        }
        resolve();
      });
    });
  }

  /* --- 3.4: Renderizado --- */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {/** DialogTitle es OBLIGATORIO para accesibilidad (lectores de pantalla) */}
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Modifica los campos y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        {isLoading || !defaultValues ? (
          /** Estado de carga: Skeletons mientras llega el GET */
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ) : (
          /**
           * key={productId} fuerza remontar el formulario si se edita
           * otro producto, evitando que queden valores del producto anterior.
           */
          <ProductForm
            key={productId}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Actualizar"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
