"use client";

/**
 * Página de creación de producto.
 *
 * Client Component porque el formulario es interactivo y usa
 * Server Actions + navegación del cliente tras el éxito.
 */
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

export default function NewProductPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="flex flex-col gap-4">
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
