# Bloque 4: Layout y sidebar

**Duración:** 30 min  
**Objetivo:** Dashboard con barra lateral y navegación entre rutas.

---

## Paso 1: Instalar componentes shadcn (5 min)

```bash
npx shadcn@latest add sidebar separator -y
```

Opcional: agregar bloque sidebar simplificado:

```bash
npx shadcn@latest add sidebar-07 -y
```

Luego simplificar `app-sidebar.tsx` (el bloque trae mucho código demo).

---

## Paso 2: Grupo de rutas y layout (10 min)

1. **Eliminar** `app/page.tsx` (template default) si existe
2. Crear estructura:

```
app/(dashboard)/
├── layout.tsx
├── page.tsx
```

**`app/(dashboard)/layout.tsx`:**

- `SidebarProvider`
- `AppSidebar`
- `SidebarInset` con header + `<main>{children}</main>`

**`app/(dashboard)/page.tsx`:**

```typescript
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/products");
}
```

Referencia: [`app/(dashboard)/layout.tsx`](../../app/(dashboard)/layout.tsx)

---

## Paso 3: AppSidebar (15 min)

Crear `components/app-sidebar.tsx`:

- `"use client"` (usa `usePathname`)
- Enlaces: `/products` y `/products/new`
- Íconos: `PackageIcon`, `PlusIcon` de lucide-react
- Resaltar ítem activo con `isActive`

```typescript
const navItems = [
  { title: "Productos", url: "/products", icon: PackageIcon },
  { title: "Crear producto", url: "/products/new", icon: PlusIcon },
];
```

Referencia: [`components/app-sidebar.tsx`](../../components/app-sidebar.tsx)

---

## Paso 4: Root layout — Toaster y TooltipProvider

En `app/layout.tsx`, asegurar:

```tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

<TooltipProvider>
  {children}
  <Toaster richColors position="top-right" />
</TooltipProvider>
```

---

## Verificación ✅

- [ ] `/` redirige a `/products`
- [ ] Sidebar visible con 2 enlaces
- [ ] Clic en enlaces navega (aunque /products aún no exista → 404 OK por ahora)
- [ ] SidebarTrigger colapsa/expande en desktop

---

## Errores comunes

| Error | Solución |
|-------|----------|
| Conflicto dos page.tsx en `/` | Eliminar `app/page.tsx` |
| Sidebar sin estilos | Verificar `SidebarProvider` envuelve todo |
| Tooltips rotos | Agregar `TooltipProvider` en root layout |

---

## Siguiente bloque

👉 [Bloque 5: Listado y tabla](05-listado-y-tabla.md)
