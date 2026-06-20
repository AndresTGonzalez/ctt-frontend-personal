# Ejercicios post-clase

Práctica para consolidar lo aprendido después de la sesión.  
**Nivel:** principiante — requieren leer código existente y hacer cambios acotados.

---

## Ejercicio 1: Filtro por nombre

**Objetivo:** Usar `searchParams` para filtrar productos  
**Archivos:** `products/page.tsx`, `products-table.tsx`, posiblemente backend

### Tarea

Agregar input de búsqueda que filtre por nombre vía URL: `/products?search=laptop`

### Pistas

1. Leer `search` de `searchParams` en la page
2. Si el API no soporta filtro, filtrar `data.items` en cliente (solución temporal)
3. Input controlado que hace `router.push('?search=...')`

### Solución orientativa

```typescript
// En page.tsx (si filtras en servidor/cliente sobre items):
const search = params.search?.toLowerCase() ?? "";
const filtered = search
  ? data.items.filter((p) => p.name.toLowerCase().includes(search))
  : data.items;
```

Para producción real, el filtro debería ir al API FastAPI.

### Criterios de éxito

- [ ] Escribir en el input actualiza la URL
- [ ] La tabla muestra solo productos que coinciden
- [ ] Limpiar el input restaura todos los productos

---

## Ejercicio 2: Empty state con componente Empty

**Objetivo:** Usar otro componente shadcn

### Tarea

Cuando no hay productos, mostrar el componente `Empty` de shadcn en lugar de una fila de tabla vacía.

### Pasos

```bash
npx shadcn@latest add empty -y
```

Reemplazar el mensaje "No hay productos registrados" por `<Empty>` con ícono, título y botón link a `/products/new`.

### Criterios de éxito

- [ ] UI más amigable cuando `items.length === 0`
- [ ] Botón "Crear producto" en el empty state

---

## Ejercicio 3: Toggle dark mode

**Objetivo:** Entender tokens CSS y clase `.dark`

### Tarea

Agregar botón en el header que alterne entre tema claro y oscuro.

### Pistas

1. shadcn ya define variables en `.dark` en `globals.css`
2. Toggle: `document.documentElement.classList.toggle('dark')`
3. Opcional: persistir en `localStorage`

```typescript
function toggleDark() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
}
```

### Criterios de éxito

- [ ] Clic cambia colores de fondo y texto
- [ ] Preferencia persiste al recargar (bonus)

---

## Ejercicio 4: Validación — precio máximo

**Objetivo:** Modificar esquema Zod

### Tarea

El precio no puede superar 10,000.

### Pasos

En `lib/validations/product.ts`:

```typescript
price: z.number()
  .positive("El precio debe ser mayor a 0")
  .max(10000, "El precio no puede superar 10,000"),
```

### Criterios de éxito

- [ ] Formulario muestra error si price > 10000
- [ ] Server Action también rechaza el valor (probar sin validación cliente)

---

## Ejercicio 5: Breadcrumb dinámico

**Objetivo:** Navegación contextual en el header

### Tarea

Mostrar breadcrumb en el header del dashboard:

- `/products` → "Productos"
- `/products/new` → "Productos / Nuevo"

### Pasos

```bash
npx shadcn@latest add breadcrumb -y
```

Usar `usePathname()` en un componente cliente del header.

### Solución orientativa

```tsx
// components/dashboard-header.tsx
"use client";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  "/products": "Productos",
  "/products/new": "Nuevo producto",
};
```

### Criterios de éxito

- [ ] Breadcrumb cambia según la ruta
- [ ] Enlaces funcionan (opcional)

---

## Tabla de dificultad

| Ejercicio | Dificultad | Tiempo estimado |
|-----------|------------|-----------------|
| 4. Validación Zod | ⭐ Fácil | 15 min |
| 3. Dark mode | ⭐⭐ Media | 30 min |
| 1. Filtro búsqueda | ⭐⭐ Media | 45 min |
| 2. Empty state | ⭐⭐ Media | 30 min |
| 5. Breadcrumb | ⭐⭐⭐ Avanzada | 45 min |

---

## Preguntas de reflexión (para entrega escrita opcional)

1. ¿Por qué el listado es Server Component y el formulario Client Component?
2. ¿Qué ventaja tienen las Server Actions sobre fetch directo desde el navegador?
3. ¿Por qué el diálogo de edición hace GET al abrir en lugar de usar datos de la tabla?
4. ¿Qué hace `revalidatePath('/products')`?
5. Dibuja el flujo de datos desde clic en "Crear" hasta que aparece en la tabla.

---

## Recursos para resolver dudas

- [Arquitectura del proyecto](../estudiantes/04-arquitectura-del-proyecto.md)
- [Glosario](../estudiantes/06-glosario.md)
- [FAQ del profesor](../profesor/02-preguntas-frecuentes.md)
- Código comentado en el repositorio
