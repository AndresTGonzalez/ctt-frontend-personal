"use client";

/**
 * =============================================================================
 * ARCHIVO: components/products/product-form.tsx — Formulario reutilizable
 * =============================================================================
 *
 * Tipo: Client Component — usa react-hook-form para estado y validación
 *
 * Se reutiliza en:
 * - /products/new (creación)
 * - EditProductDialog (edición)
 *
 * Validación: Zod (productSchema) via zodResolver
 * UI: FieldGroup + Field de shadcn/ui
 * =============================================================================
 */

/* --- SECCIÓN 1: Importaciones --- */
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ProductInput } from "@/lib/types/product";
import {
  productSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

/* --- SECCIÓN 2: Tipos de props --- */
type ProductFormProps = {
  /** Valores iniciales (vacíos en creación, precargados en edición) */
  defaultValues?: Partial<ProductFormValues>;
  /** Callback async que ejecuta la Server Action (create o update) */
  onSubmit: (data: ProductInput) => Promise<void>;
  /** true mientras la Server Action está en curso */
  isPending?: boolean;
  /** Texto del botón de envío */
  submitLabel?: string;
};

/* --- SECCIÓN 3: Valores por defecto del formulario --- */
const emptyDefaults: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  is_active: true,
};

/* --- SECCIÓN 4: Componente formulario --- */
export function ProductForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Guardar",
}: ProductFormProps) {
  /**
   * useForm de react-hook-form:
   * - resolver: conecta Zod para validar antes de enviar
   * - defaultValues: mezcla valores vacíos con los precargados (edición)
   */
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...emptyDefaults, ...defaultValues },
  });

  /** handleSubmit valida con Zod y solo llama onSubmit si pasa la validación */
  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        {/* --- Campo: Nombre --- */}
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input
            id="name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        {/* --- Campo: Descripción --- */}
        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <Textarea
            id="description"
            aria-invalid={!!form.formState.errors.description}
            {...form.register("description")}
          />
          <FieldError errors={[form.formState.errors.description]} />
        </Field>

        {/* --- Campos: Precio y Stock (grid responsive 1 col → 2 cols en md) --- */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.price}>
            <FieldLabel htmlFor="price">Precio</FieldLabel>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              aria-invalid={!!form.formState.errors.price}
              {...form.register("price", { valueAsNumber: true })}
            />
            <FieldError errors={[form.formState.errors.price]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.stock}>
            <FieldLabel htmlFor="stock">Stock</FieldLabel>
            <Input
              id="stock"
              type="number"
              min="0"
              aria-invalid={!!form.formState.errors.stock}
              {...form.register("stock", { valueAsNumber: true })}
            />
            <FieldError errors={[form.formState.errors.stock]} />
          </Field>
        </div>

        {/* --- Campo: Activo (Switch requiere Controller, no register) --- */}
        <Field orientation="horizontal">
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor="is_active">Activo</FieldLabel>
            <FieldDescription>
              Los productos inactivos no se muestran en el catálogo.
            </FieldDescription>
          </div>
          <Controller
            name="is_active"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="is_active"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>
      </FieldGroup>

      {/* Botón de envío con Spinner mientras isPending=true */}
      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending && <Spinner data-icon="inline-start" />}
        {submitLabel}
      </Button>
    </form>
  );
}
