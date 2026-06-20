# Bloque 6: Crear producto

**Duración:** 25 min  
**Objetivo:** Formulario reutilizable y página de creación con Server Action.

---

## Paso 1: Instalar componentes de formulario (5 min)

```bash
npx shadcn@latest add input textarea switch field card spinner -y
```

---

## Paso 2: ProductForm reutilizable (15 min)

Crear `components/products/product-form.tsx`:

- `"use client"`
- `react-hook-form` + `zodResolver(productSchema)`
- Campos: name, description, price, stock, is_active (Switch)
- `FieldGroup` + `Field` + `FieldLabel` + `FieldError`
- Props: `defaultValues?`, `onSubmit`, `isPending?`, `submitLabel?`
- `valueAsNumber: true` en price y stock

Patrón Switch con Controller:

```typescript
<Controller
  name="is_active"
  control={form.control}
  render={({ field }) => (
    <Switch checked={field.value} onCheckedChange={field.onChange} />
  )}
/>
```

Referencia: [`components/products/product-form.tsx`](../../components/products/product-form.tsx)

---

## Paso 3: Página /products/new (5 min)

Crear `app/(dashboard)/products/new/page.tsx`:

- `"use client"`
- Card con ProductForm
- `createProduct` Server Action
- `useTransition` para isPending
- Toast éxito + `router.push('/products')`

Referencia: [`app/(dashboard)/products/new/page.tsx`](../../app/(dashboard)/products/new/page.tsx)

---

## Verificación ✅

- [ ] Sidebar enlace "Crear producto" funciona
- [ ] Formulario valida (nombre vacío → error)
- [ ] Crear producto → toast → redirige a tabla
- [ ] Nuevo producto aparece en listado

---

## Errores comunes

| Error | Solución |
|-------|----------|
| Zod number/string | `valueAsNumber: true` en register |
| Toast no aparece | Verificar `<Toaster />` en layout |
| Tabla no actualiza | Verificar `revalidatePath` en createProduct |

---

## Siguiente bloque

👉 [Bloque 7: Editar y eliminar](07-editar-y-eliminar.md)
