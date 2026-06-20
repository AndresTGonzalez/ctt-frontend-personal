# Bloque 3: Capas de datos

**Duración:** 35 min  
**Objetivo:** Types, validación Zod, cliente HTTP y Server Actions.

---

## Paso 1: Tipos TypeScript (5 min)

Crear `lib/types/product.ts`:

```typescript
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

export type ProductInput = Omit<Product, "id">;
```

Referencia: [`lib/types/product.ts`](../../lib/types/product.ts)

---

## Paso 2: Validación Zod (5 min)

Crear `lib/validations/product.ts`:

```typescript
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().max(500),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  is_active: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
```

---

## Paso 3: Cliente HTTP (10 min)

Crear `lib/api/products.ts` con:

1. `API_BASE_URL` desde `process.env`
2. Helper `handleResponse<T>()`
3. Funciones:
   - `getProducts(page, pageSize)`
   - `getProductById(id)`
   - `createProduct(data)`
   - `updateProduct(id, data)`
   - `deleteProduct(id)`

**Prueba rápida:** crear página temporal o script para llamar `getProducts(1, 10)`.

Referencia completa: [`lib/api/products.ts`](../../lib/api/products.ts)

---

## Paso 4: Server Actions (15 min)

Crear `actions/products.ts`:

```typescript
"use server";

import { revalidatePath } from "next/cache";
// imports de lib/api, types, validations...

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getProductById(id: number) { /* ... */ }
export async function createProduct(input: ProductInput) { /* ... */ }
export async function updateProduct(id: number, input: ProductInput) { /* ... */ }
export async function deleteProduct(id: number) { /* ... */ }
```

Patrón de cada mutación:

1. Validar con `productSchema.safeParse()`
2. Llamar función de `lib/api`
3. `revalidatePath("/products")` en mutaciones
4. Retornar `{ success, data }` o `{ success: false, error }`

Referencia: [`actions/products.ts`](../../actions/products.ts)

---

## Verificación ✅

- [ ] Backend responde a curl
- [ ] `getProducts(1, 10)` retorna items (probar en consola o page temp)
- [ ] `actions/products.ts` exporta 4 funciones sin errores TypeScript
- [ ] `npm run build` pasa (opcional, puede ser lento)

---

## Errores comunes

| Error | Solución |
|-------|----------|
| `API_BASE_URL undefined` | Crear `.env.local`; reiniciar dev server |
| fetch failed / ECONNREFUSED | Backend apagado |
| `"use server"` en archivo mezclado | Server Actions en archivo dedicado |

---

## ☕ Descanso recomendado después de este bloque

---

## Siguiente bloque

👉 [Bloque 4: Layout y sidebar](04-layout-y-sidebar.md)
