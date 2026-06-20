# Tailwind CSS v4 y shadcn/ui

Material de estudio — Estilos y componentes de interfaz.

---

## Objetivos de aprendizaje

- Entender qué es Tailwind y cómo se usa en el proyecto
- Conocer tokens semánticos vs colores hardcodeados
- Saber qué es shadcn/ui y cómo se integra

---

## 1. Tailwind CSS — Utilidades en el className

Tailwind provee clases pequeñas que combinas en JSX:

```tsx
<div className="flex flex-col gap-4 p-4 md:p-6">
  <h1 className="text-2xl font-semibold">Productos</h1>
</div>
```

| Clase | Significado |
|-------|-------------|
| `flex` | Display flexbox |
| `flex-col` | Dirección vertical |
| `gap-4` | Espacio entre hijos (16px) |
| `p-4` | Padding 16px |
| `md:p-6` | Padding 24px en pantallas medianas+ |
| `text-2xl` | Texto grande |
| `truncate` | Cortar texto largo con "..." |

**Regla del proyecto:** usar `gap-*` en lugar de `space-y-*`.

---

## 2. Tailwind v4 — Configuración en CSS

En v3 existía `tailwind.config.js`. En **v4** el tema vive en CSS:

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --color-success: var(--success);
}
```

Esto habilita clases como `bg-background`, `text-primary`, `bg-success`.

Ver: [`app/globals.css`](../../app/globals.css)

---

## 3. Tokens semánticos

```tsx
// ✅ Correcto — tokens del tema
<Badge variant="success">Activo</Badge>
<p className="text-muted-foreground">3 productos en total</p>

// ❌ Evitar — colores raw
<span className="text-green-500">Activo</span>
```

Ventaja: cambiar el tema en `globals.css` actualiza toda la app.

---

## 4. shadcn/ui — Componentes copiados al proyecto

shadcn **no** es una dependencia npm tradicional. El CLI **copia** componentes a `components/ui/`:

```bash
npx shadcn@latest add button table dialog
```

Ventajas:

- Control total del código
- Personalizable
- Accesible (ARIA, teclado)

Componentes que usamos:

| Componente | Uso en el proyecto |
|------------|-------------------|
| `Sidebar` | Menú lateral |
| `Table` | Listado de productos |
| `Dialog` | Editar producto |
| `AlertDialog` | Confirmar eliminación |
| `Button`, `Input`, `Field` | Formularios |
| `Badge` | Estado activo/inactivo |
| `Card` | Página crear producto |
| `Pagination` | Navegación de páginas |
| `Skeleton` | Placeholders de carga |
| `sonner` | Notificaciones toast |

---

## 5. Composición de formularios (shadcn)

```tsx
<FieldGroup>
  <Field data-invalid={!!errors.name}>
    <FieldLabel htmlFor="name">Nombre</FieldLabel>
    <Input id="name" {...register("name")} />
    <FieldError errors={[errors.name]} />
  </Field>
</FieldGroup>
```

Ver: [`components/products/product-form.tsx`](../../components/products/product-form.tsx)

---

## 6. cn() — Combinar clases

```typescript
import { cn } from "@/lib/utils";

cn("px-4 py-2", isActive && "bg-accent", className);
```

[`lib/utils.ts`](../../lib/utils.ts) combina `clsx` + `tailwind-merge` para evitar conflictos.

---

## 7. Fuente Open Sans (next/font)

```typescript
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});
```

Next.js descarga y optimiza la fuente en build time. Ver [`app/layout.tsx`](../../app/layout.tsx).

---

## Preguntas de repaso

1. ¿Dónde se configura el tema en Tailwind v4?
2. ¿Por qué usamos `bg-success` en lugar de `bg-green-500`?
3. ¿Qué hace `npx shadcn@latest add button`?
4. ¿Para qué sirve `cn()`?

---

## Siguiente lectura

[Arquitectura del proyecto](04-arquitectura-del-proyecto.md)
