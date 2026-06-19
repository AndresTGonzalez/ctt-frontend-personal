"use client";

/**
 * Formulario reutilizable de producto.
 *
 * Client Component porque usa react-hook-form (estado local + validación en cliente).
 * Se reutiliza en la página de creación y en el diálogo de edición.
 *
 * Composición shadcn: FieldGroup + Field + FieldLabel + FieldError
 * Validación: Zod via zodResolver
 */
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

type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (data: ProductInput) => Promise<void>;
  isPending?: boolean;
  submitLabel?: string;
};

const emptyDefaults: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  is_active: true,
};

export function ProductForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Guardar",
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...emptyDefaults, ...defaultValues },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input
            id="name"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <Textarea
            id="description"
            aria-invalid={!!form.formState.errors.description}
            {...form.register("description")}
          />
          <FieldError errors={[form.formState.errors.description]} />
        </Field>

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

      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending && <Spinner data-icon="inline-start" />}
        {submitLabel}
      </Button>
    </form>
  );
}
