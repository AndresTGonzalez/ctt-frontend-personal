# Code-along — Overview

Guía paso a paso para construir el proyecto CTT Productos en una sesión de ~4 horas.

---

## Cómo usar esta guía

Cada bloque incluye:

1. **Objetivo** — qué construyes
2. **Comandos** — qué ejecutar en terminal
3. **Archivos** — qué crear o editar
4. **Verificación** — cómo saber que funciona
5. **Errores comunes** — soluciones rápidas

Sigue los bloques **en orden**. No avances si el checkpoint del bloque anterior falla.

---

## Mapa de bloques

| # | Bloque | Duración | Documento | Archivos principales |
|---|--------|----------|-----------|---------------------|
| 1 | Scaffold y setup | 20 min | [01-scaffold-y-setup.md](01-scaffold-y-setup.md) | `package.json`, `app/` |
| 2 | shadcn y Tailwind | 25 min | [02-shadcn-y-tailwind.md](02-shadcn-y-tailwind.md) | `globals.css`, `layout.tsx`, `.env` |
| 3 | Capas de datos | 35 min | [03-capas-de-datos.md](03-capas-de-datos.md) | `lib/`, `actions/` |
| 4 | Layout y sidebar | 30 min | [04-layout-y-sidebar.md](04-layout-y-sidebar.md) | `(dashboard)/`, `app-sidebar.tsx` |
| 5 | Listado y tabla | 40 min | [05-listado-y-tabla.md](05-listado-y-tabla.md) | `products/page.tsx`, `products-table.tsx` |
| 6 | Crear producto | 25 min | [06-crear-producto.md](06-crear-producto.md) | `product-form.tsx`, `products/new/` |
| 7 | Editar y eliminar | 25 min | [07-editar-y-eliminar.md](07-editar-y-eliminar.md) | `edit-product-dialog`, `delete-product-dialog` |

**Total code-along:** ~3 h 20 min (+ 25 min contexto + 15 min descanso ≈ 4 h)

---

## Árbol de archivos al finalizar

```
app/
├── layout.tsx
├── globals.css
└── (dashboard)/
    ├── layout.tsx
    ├── page.tsx
    └── products/
        ├── page.tsx
        ├── loading.tsx
        └── new/page.tsx

actions/products.ts

components/
├── app-sidebar.tsx
├── ui/                    ← generado por shadcn
└── products/
    ├── products-table.tsx
    ├── product-form.tsx
    ├── edit-product-dialog.tsx
    └── delete-product-dialog.tsx

lib/
├── utils.ts
├── types/product.ts
├── validations/product.ts
└── api/products.ts

.env.example
.env.local
```

---

## Prerrequisitos

- [ ] Node.js 20+
- [ ] Backend FastAPI en `localhost:8000`
- [ ] Tarea previa completada: [00-antes-de-la-clase.md](../estudiantes/00-antes-de-la-clase.md)

---

## Referencia al código final

Si te atasas, compara con el repositorio completo. Cada archivo del proyecto tiene comentarios explicativos por sección.

---

## Empezar

👉 [Bloque 1: Scaffold y setup](01-scaffold-y-setup.md)
