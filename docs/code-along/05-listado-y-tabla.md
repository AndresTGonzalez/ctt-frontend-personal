# Bloque 5: Listado y tabla

**Duración:** 40 min  
**Objetivo:** Página de productos con tabla paginada conectada al API.

---

## Paso 1: Instalar componentes (5 min)

```bash
npx shadcn@latest add table badge button pagination -y
```

Agregar variante `success` al Badge en `components/ui/badge.tsx` y tokens en `globals.css` (ver repo final).

---

## Paso 2: Server Component — products/page.tsx (15 min)

Crear `app/(dashboard)/products/page.tsx`:

```typescript
import { ProductsTable } from "@/components/products/products-table";
import { getProducts } from "@/lib/api/products";

type ProductsPageProps = {
  searchParams: Promise<{ page?: string; page_size?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.page_size) || 10);

  const data = await getProducts(page, pageSize);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Productos</h1>
      <p className="text-sm text-muted-foreground">
        {data.total} productos en total
      </p>
      <ProductsTable data={data} />
    </div>
  );
}
```

Agregar manejo de errores try/catch (ver repo final).

Referencia: [`app/(dashboard)/products/page.tsx`](../../app/(dashboard)/products/page.tsx)

---

## Paso 3: loading.tsx (5 min)

Crear `app/(dashboard)/products/loading.tsx` con Skeletons.

Referencia: [`app/(dashboard)/products/loading.tsx`](../../app/(dashboard)/products/loading.tsx)

---

## Paso 4: Client Component — products-table.tsx (15 min)

Crear `components/products/products-table.tsx`:

1. `"use client"`
2. Props: `{ data: PaginatedProducts }`
3. Tabla con columnas: Nombre, Descripción, Precio, Stock, Estado, Acciones
4. Badge `success` / `secondary` para activo/inactivo
5. Botones Editar/Eliminar (estado local, diálogos en bloque 7)
6. Paginación con `router.push('?page=N')`
7. Labels **Anterior** / **Siguiente**

Función clave:

```typescript
function goToPage(page: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("page_size", String(data.page_size));
  router.push(`/products?${params.toString()}`);
}
```

Referencia: [`components/products/products-table.tsx`](../../components/products/products-table.tsx)

---

## Verificación ✅

- [ ] `/products` muestra tabla con datos del API
- [ ] Paginación funciona si hay más de 10 productos
- [ ] Badge verde "Activo" visible
- [ ] loading.tsx aparece brevemente al navegar (opcional)

---

## Errores comunes

| Error | Solución |
|-------|----------|
| Tabla vacía sin error | Backend sin datos; crear productos |
| searchParams error | Agregar `async` y `await searchParams` |
| ProductsTable en Server Component sin "use client" | Directiva en products-table.tsx |

---

## Mini-ejercicio en clase (5 min)

Agregar columna **ID** a la tabla. Ver [ejercicios-en-clase.md](../ejercicios/ejercicios-en-clase.md).

---

## Siguiente bloque

👉 [Bloque 6: Crear producto](06-crear-producto.md)
