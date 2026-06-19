"use client";

/**
 * Diálogo de confirmación para eliminar un producto.
 *
 * Usa AlertDialog de shadcn para pedir confirmación explícita
 * antes de ejecutar la Server Action deleteProduct.
 */
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteProduct } from "@/actions/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

type DeleteProductDialogProps = {
  productId: number | null;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteProductDialog({
  productId,
  productName,
  open,
  onOpenChange,
}: DeleteProductDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (productId === null) return;

    startTransition(async () => {
      const result = await deleteProduct(productId);

      if (result.success) {
        toast.success("Producto eliminado correctamente");
        onOpenChange(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente{" "}
            <strong>{productName}</strong> del catálogo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
          >
            {isPending && <Spinner data-icon="inline-start" />}
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
