"use client";

/**
 * Diálogo de edición de producto con precarga GET.
 *
 * Flujo educativo clave:
 * 1. El usuario hace clic en "Editar" → se abre el diálogo
 * 2. Se muestra un Skeleton mientras se llama getProductById (Server Action)
 * 3. Al recibir los datos, se precarga el formulario con reset()
 * 4. Al guardar, se llama updateProduct y se cierra el diálogo
 *
 * El GET ocurre al abrir el diálogo para garantizar datos frescos del servidor.
 */
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

type EditProductDialogProps = {
  productId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditProductDialog({
  productId,
  open,
  onOpenChange,
}: EditProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<ProductInput | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open || productId === null) {
      setDefaultValues(null);
      return;
    }

    let cancelled = false;

    async function loadProduct() {
      setIsLoading(true);
      const result = await getProductById(productId!);

      if (cancelled) return;

      if (result.success) {
        const { id: _, ...input } = result.data;
        setDefaultValues(input);
      } else {
        toast.error(result.error);
        onOpenChange(false);
      }

      setIsLoading(false);
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [open, productId, onOpenChange]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Modifica los campos y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        {isLoading || !defaultValues ? (
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
