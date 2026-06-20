# CTT Productos — App educativa CRUD

Aplicación educativa de gestión de productos construida con **Next.js 16**, **Tailwind CSS v4**, **shadcn/ui** y **Server Actions**, conectada a un API FastAPI.

## Documentación de clase

Material para profesores y estudiantes (guion de clase, code-along, ejercicios y conceptos): **[docs/README.md](docs/README.md)**

## Objetivo del proyecto

Demostrar un CRUD completo (crear, leer, actualizar, eliminar) con:

- Barra lateral de navegación (shadcn Sidebar)
- Tabla paginada de productos
- Página dedicada para crear productos
- Diálogo modal para editar (con precarga GET del registro)
- Diálogo de confirmación para eliminar

El código incluye comentarios explicativos en cada archivo para facilitar el aprendizaje.

## Requisitos

- Node.js 20+
- Backend FastAPI corriendo en `http://localhost:8000`
- npm

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La ruta `/` redirige automáticamente a `/products`.

## Estructura de carpetas

```
app/
├── layout.tsx                 # Layout raíz: fuentes, Toaster, TooltipProvider
├── globals.css                # Tailwind v4 + tokens shadcn
└── (dashboard)/               # Grupo de rutas (no afecta la URL)
    ├── layout.tsx             # SidebarProvider + shell del dashboard
    ├── page.tsx               # Redirige / → /products
    └── products/
        ├── page.tsx           # Listado (Server Component)
        ├── loading.tsx        # Skeleton de carga
        └── new/page.tsx       # Crear producto (Client Component)

actions/
└── products.ts                # Server Actions CRUD

components/
├── app-sidebar.tsx            # Menú lateral
├── ui/                        # Componentes shadcn/ui
└── products/                  # Componentes del módulo de productos
    ├── products-table.tsx
    ├── product-form.tsx
    ├── edit-product-dialog.tsx
    └── delete-product-dialog.tsx

lib/
├── utils.ts                   # cn() — combina clases Tailwind
├── types/product.ts           # Tipos TypeScript del API
├── validations/product.ts     # Esquema Zod para formularios
└── api/products.ts            # Cliente HTTP del servidor
```

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  Navegador (Client Components)                          │
│  ProductsTable, ProductForm, EditDialog, DeleteDialog   │
└──────────────────────┬──────────────────────────────────┘
                       │ Server Actions ('use server')
┌──────────────────────▼──────────────────────────────────┐
│  Servidor Next.js                                       │
│  actions/products.ts  →  lib/api/products.ts  →  fetch  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP
┌──────────────────────▼──────────────────────────────────┐
│  FastAPI (localhost:8000/products)                      │
└─────────────────────────────────────────────────────────┘
```

| Operación | Componente | Mecanismo |
|-----------|------------|-----------|
| Listar | `products/page.tsx` (Server) | `getProducts()` en servidor |
| Crear | `products/new/page.tsx` (Client) | Server Action `createProduct` |
| Obtener uno | `edit-product-dialog.tsx` (Client) | Server Action `getProductById` |
| Actualizar | `edit-product-dialog.tsx` (Client) | Server Action `updateProduct` |
| Eliminar | `delete-product-dialog.tsx` (Client) | Server Action `deleteProduct` |

Tras cada mutación se llama `revalidatePath('/products')` para refrescar el listado.

## Convenciones Next.js 16

- **`searchParams` async**: en `products/page.tsx`, `searchParams` es una `Promise` que debe `await`-arse.
- **Server Components vs Client Components**: las páginas de listado son Server Components; formularios, diálogos y tablas interactivas son Client Components (`"use client"`).
- **Server Actions**: funciones con `'use server'` que ejecutan mutaciones en el servidor sin exponer la URL del API al navegador.
- **Grupos de rutas**: `(dashboard)` organiza archivos sin cambiar la URL.
- **`loading.tsx`**: Suspense automático mientras carga el Server Component.

## Tailwind CSS v4

### Diferencias con v3

| Tailwind v3 | Tailwind v4 |
|-------------|-------------|
| `tailwind.config.js` | Configuración en CSS (`@theme inline`) |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Plugins en JS | `@import "shadcn/tailwind.css"` |

### Archivos clave

- **`app/globals.css`**: punto de entrada de estilos con `@import "tailwindcss"` y `@theme inline`.
- **`postcss.config.mjs`**: plugin `@tailwindcss/postcss` procesa las clases.

### Tokens semánticos vs colores raw

```tsx
// Correcto — usa tokens del tema
<div className="bg-background text-muted-foreground border-border" />

// Incorrecto — colores hardcodeados
<div className="bg-zinc-50 text-gray-600 border-gray-200" />
```

### Utilidades comunes en este proyecto

| Clase | Uso |
|-------|-----|
| `flex flex-col gap-4` | Stack vertical con espaciado |
| `min-h-svh` | Altura mínima del viewport |
| `p-4 md:p-6` | Padding responsive (mobile-first) |
| `truncate` | Texto largo en celdas de tabla |
| `rounded-lg border` | Contenedor de tabla |

### `cn()` — composición de clases

```typescript
import { cn } from "@/lib/utils";

// Combina clases y resuelve conflictos con tailwind-merge
cn("px-4", isActive && "bg-accent");
```

## Convenciones shadcn/ui

- **FieldGroup + Field**: layout de formularios (no `div` con `space-y-*`).
- **gap-\*** en lugar de **space-y-\***: espaciado con flexbox.
- **DialogTitle**: obligatorio en diálogos (accesibilidad).
- **Badge**: estados activo/inactivo (no spans con colores raw).
- **className en componentes shadcn**: solo para layout (ancho, padding), no para sobrescribir colores.

## Endpoints del API

| Operación | cURL | Función en código |
|-----------|------|-------------------|
| Listar | `GET /products/?page=1&page_size=10` | `getProducts()` |
| Crear | `POST /products/` | `createProduct()` |
| Obtener uno | `GET /products/{id}` | `getProductById()` |
| Actualizar | `PUT /products/{id}` | `updateProduct()` |
| Eliminar | `DELETE /products/{id}` | `deleteProduct()` |

Las funciones están en `lib/api/products.ts` y se invocan desde `actions/products.ts`.

## Guía para estudiantes

### Ejercicios sugeridos

1. **Agregar una columna** a la tabla (por ejemplo, mostrar el ID del producto).
2. **Cambiar el tamaño de página** por defecto de 10 a 5 registros.
3. **Agregar un filtro** por nombre usando `searchParams` en la URL.
4. **Personalizar el tema** modificando las variables CSS en `globals.css`.
5. **Agregar dark mode toggle** usando la clase `.dark` en el elemento `<html>`.
6. **Mostrar un Empty state** cuando no hay productos, usando el componente `Empty` de shadcn.

### Preguntas de reflexión

- ¿Por qué el listado es Server Component y el formulario es Client Component?
- ¿Qué ventaja tiene usar Server Actions en lugar de `fetch` directo desde el navegador?
- ¿Por qué el diálogo de edición hace un GET al abrir en lugar de usar los datos de la tabla?
- ¿Qué hace `revalidatePath('/products')` después de una mutación?

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```
