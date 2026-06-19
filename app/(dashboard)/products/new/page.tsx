"use client";

/**
 * =============================================================================
 * ARCHIVO: app/(dashboard)/products/new/page.tsx — Crear producto
 * =============================================================================
 *
 * Ruta: /products/new
 * Tipo: Client Component — necesita interactividad (formulario, navegación, toast)
 *
 * Flujo:
 * 1. Usuario completa ProductForm
 * 2. Se llama createProduct (Server Action)
 * 3. Si éxito → toast + redirección a /products
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createProduct } from "@/actions/products";
import { ProductForm } from "@/components/products/product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductInput } from "@/lib/types/product";

/* --- SECCIÓN 2: Componente de página --- */
export default function NewProductPage() {
  /** useRouter: navegación programática del cliente (router.push) */
  const router = useRouter();

  /**
   * useTransition: marca isPending=true mientras corre la Server Action.
   * Deshabilita el botón del formulario y muestra el Spinner.
   */
  const [isPending, startTransition] = useTransition();

  /* --- SECCIÓN 3: Handler de envío del formulario --- */
  async function handleSubmit(data: ProductInput) {
    return new Promise<void>((resolve) => {
      startTransition(async () => {
        const result = await createProduct(data);

        if (result.success) {
          toast.success("Producto creado correctamente");
          router.push("/products");
        } else {
          toast.error(result.error);
        }
        resolve();
      });
    });
  }

  /* --- SECCIÓN 4: Renderizado --- */
  return (
    <div className="flex flex-col gap-4">
      {/**
       * Card de shadcn: composición CardHeader + CardTitle + CardDescription + CardContent
       * max-w-lg limita el ancho del formulario para mejor legibilidad
       */}
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Nuevo producto</CardTitle>
          <CardDescription>
            Completa el formulario para registrar un producto en el catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Crear producto"
          />
        </CardContent>
      </Card>
    </div>
  );
}
