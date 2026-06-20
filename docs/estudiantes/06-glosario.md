# Glosario

Términos usados en la clase y en el código del proyecto.

---

## A–C

| Término | Definición |
|---------|------------|
| **API** | Interfaz para que programas se comuniquen. Nuestro FastAPI expone `/products`. |
| **App Router** | Sistema de rutas de Next.js basado en la carpeta `app/`. |
| **Badge** | Componente shadcn para etiquetas de estado (Activo/Inactivo). |
| **Client Component** | Componente React que corre en el navegador. Requiere `"use client"`. |
| **CRUD** | Create, Read, Update, Delete — las 4 operaciones básicas sobre datos. |
| **CORS** | Regla del navegador que restringe peticiones entre dominios distintos. |

---

## D–H

| Término | Definición |
|---------|------------|
| **Dialog** | Ventana modal de shadcn para formularios (editar producto). |
| **AlertDialog** | Diálogo de confirmación (eliminar producto). |
| **Endpoint** | URL específica del API, ej: `GET /products/5`. |
| **FastAPI** | Framework Python del backend (no lo construimos en esta clase). |
| **fetch** | Función nativa para hacer peticiones HTTP. |
| **Field / FieldGroup** | Componentes shadcn para layout de formularios. |
| **Hook** | Función de React que empieza con `use` (useState, useEffect, useRouter). |

---

## J–P

| Término | Definición |
|---------|------------|
| **JSX** | Sintaxis que mezcla HTML y JavaScript en archivos `.tsx`. |
| **Layout** | Componente que envuelve varias páginas compartiendo UI (sidebar). |
| **next/font** | Sistema de Next.js para optimizar fuentes (Open Sans). |
| **Props** | Parámetros que recibe un componente. Ej: `data` en `ProductsTable`. |
| **Pagination** | Navegación entre páginas de resultados. |

---

## R–S

| Término | Definición |
|---------|------------|
| **React** | Librería para construir UI con componentes. |
| **revalidatePath** | Función de Next.js que refresca una ruta tras cambiar datos. |
| **RSC** | React Server Component — componente que corre en el servidor. |
| **searchParams** | Query params de la URL (`?page=2`). En Next.js 16 es Promise. |
| **Server Action** | Función con `"use server"` que corre en el servidor. |
| **Server Component** | Componente default de Next.js que corre en el servidor. |
| **shadcn/ui** | Colección de componentes UI copiados al proyecto via CLI. |
| **Skeleton** | Placeholder animado mientras cargan datos. |
| **Sidebar** | Barra lateral de navegación. |

---

## T–Z

| Término | Definición |
|---------|------------|
| **Tailwind CSS** | Framework de utilidades CSS (`flex`, `gap-4`, `p-4`). |
| **Toast** | Notificación temporal (éxito/error). Usamos `sonner`. |
| **Token semántico** | Variable CSS con nombre de significado (`--success`, `--primary`). |
| **TypeScript** | JavaScript con tipos estáticos. |
| **useTransition** | Hook para marcar operaciones async como "pendientes" (botón loading). |
| **Zod** | Librería de validación de esquemas. |

---

## Abreviaturas HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK — petición exitosa |
| 201 | Created — recurso creado |
| 400 | Bad Request — datos inválidos |
| 404 | Not Found — recurso no existe |
| 500 | Internal Server Error — error del servidor |

---

## Referencias cruzadas

- Conceptos web: [01-que-es-el-frontend.md](01-que-es-el-frontend.md)
- Next.js: [02-nextjs-app-router.md](02-nextjs-app-router.md)
- Estilos: [03-tailwind-y-shadcn.md](03-tailwind-y-shadcn.md)
- Arquitectura: [04-arquitectura-del-proyecto.md](04-arquitectura-del-proyecto.md)
- CRUD: [05-crud-y-server-actions.md](05-crud-y-server-actions.md)
