"use client";

/**
 * =============================================================================
 * ARCHIVO: components/products/delete-product-dialog.tsx — Eliminar producto
 * =============================================================================
 *
 * Tipo: Client Component — AlertDialog de confirmación
 *
 * Flujo:
 * 1. Usuario clic "Eliminar" → ProductsTable setea deleteTarget
 * 2. AlertDialog pide confirmación explícita (acción destructiva)
 * 3. Usuario confirma → deleteProduct (DELETE) → toast + cierra diálogo
 *
 * AlertDialog vs Dialog: AlertDialog bloquea la interacción hasta que
 * el usuario elija Cancelar o Confirmar (ideal para acciones irreversibles).
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
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

/* --- SECCIÓN 2: Tipos de props --- */
type DeleteProductDialogProps = {
  productId: number | null;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/* --- SECCIÓN 3: Componente diálogo --- */
export function DeleteProductDialog({
  productId,
  productName,
  open,
  onOpenChange,
}: DeleteProductDialogProps) {
  /** isPending=true mientras se ejecuta el DELETE */
  const [isPending, startTransition] = useTransition();

  /* --- Handler de eliminación --- */
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
          {/**
           * preventDefault en onClick evita que AlertDialogAction cierre
           * el diálogo antes de que termine la Server Action.
           */}
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
