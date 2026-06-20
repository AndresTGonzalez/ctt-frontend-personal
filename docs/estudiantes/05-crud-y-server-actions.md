# CRUD y Server Actions

Material de estudio — Operaciones de datos y comunicación con el backend.

---

## Objetivos de aprendizaje

- Mapear cada operación CRUD a código y endpoint HTTP
- Entender qué son las Server Actions y por qué las usamos
- Conocer validación con Zod y refresco con revalidatePath

---

## 1. CRUD completo en nuestro proyecto

| Operación | HTTP | Endpoint | Función API | Server Action | UI |
|-----------|------|----------|-------------|---------------|-----|
| Listar | GET | `/products/?page=&page_size=` | `getProducts()` | — (directo en page) | `products/page.tsx` |
| Leer uno | GET | `/products/{id}` | `getProductById()` | `getProductById()` | `edit-product-dialog` |
| Crear | POST | `/products/` | `createProduct()` | `createProduct()` | `products/new` |
| Actualizar | PUT | `/products/{id}` | `updateProduct()` | `updateProduct()` | `edit-product-dialog` |
| Eliminar | DELETE | `/products/{id}` | `deleteProduct()` | `deleteProduct()` | `delete-product-dialog` |

---

## 2. lib/api/products.ts — Cliente HTTP

Funciones puras que hacen `fetch` al backend:

```typescript
export async function getProducts(page = 1, pageSize = 10) {
  const url = new URL(`${API_BASE_URL}/products/`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("page_size", String(pageSize));

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  return handleResponse<PaginatedProducts>(response);
}
```

- Solo corre en **servidor**
- `API_BASE_URL` viene de `.env.local` (no expuesta al navegador)
- `cache: "no-store"` = datos siempre frescos

Ver: [`lib/api/products.ts`](../../lib/api/products.ts)

---

## 3. Server Actions — actions/products.ts

```typescript
"use server";

export async function createProduct(input: ProductInput) {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "..." };
  }

  const data = await apiCreateProduct(parsed.data);
  revalidatePath("/products");
  return { success: true, data };
}
```

### ¿Qué es `"use server"`?

Marca funciones que se ejecutan **solo en el servidor de Next.js**. El cliente las invoca como funciones normales, pero el código corre en el servidor.

### Ventajas

1. **Sin CORS:** el fetch sale del servidor, no del navegador
2. **Seguridad:** URL del API oculta
3. **Validación:** Zod en servidor antes de llamar al backend

### Formato de respuesta

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

Los Client Components muestran toast según `success`.

---

## 4. Validación con Zod

```typescript
// lib/validations/product.ts
export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  is_active: z.boolean(),
});
```

**Doble validación:**

1. **Cliente:** `zodResolver` en react-hook-form → errores instantáneos
2. **Servidor:** `productSchema.safeParse()` en actions → seguridad

---

## 5. revalidatePath — Refrescar la UI

Después de crear, editar o eliminar:

```typescript
revalidatePath("/products");
```

Next.js **invalida la caché** de esa ruta y regenera la página con datos nuevos. La tabla se actualiza sin recargar manualmente.

---

## 6. Tipos TypeScript

```typescript
// lib/types/product.ts
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
};

export type ProductInput = Omit<Product, "id">;
export type PaginatedProducts = { items: Product[]; total: number; /* ... */ };
```

Los tipos reflejan el JSON exacto del API FastAPI.

---

## 7. Variables de entorno

```env
# .env.local (NO commitear)
API_BASE_URL=http://localhost:8000
```

- **Sin** `NEXT_PUBLIC_` → solo el servidor la lee
- Copiar desde [`.env.example`](../../.env.example)

---

## Preguntas de repaso

1. ¿Por qué listar productos no usa Server Action?
2. ¿Qué pasa si omites `revalidatePath` después de crear?
3. ¿Por qué validamos con Zod en cliente Y servidor?
4. ¿Qué ventaja tiene Server Actions sobre fetch desde el navegador?

---

## Siguiente lectura

[Glosario](06-glosario.md)
