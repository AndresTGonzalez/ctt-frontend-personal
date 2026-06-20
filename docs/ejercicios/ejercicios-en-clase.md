# Ejercicios en clase

Mini-retos de **~5 minutos** cada uno. El profesor los lanza entre bloques para reforzar aprendizaje.

---

## Ejercicio 1: Badge verde para "Activo"

**Cuándo:** Después del Bloque 5 (listado y tabla)  
**Objetivo:** Entender variantes de Badge y tokens CSS

### Tarea

Cambiar el badge de estado activo de negro (`default`) a verde (`success`).

### Pasos

1. En `app/globals.css`, agregar tokens `--success` en `:root` y `.dark`
2. En `@theme inline`, agregar `--color-success: var(--success)`
3. En `components/ui/badge.tsx`, agregar variante `success`
4. En `products-table.tsx`, usar `variant="success"` cuando `is_active`

### Verificación

Badge "Activo" se ve verde con fondo suave.

### Solución orientativa

Ver el repo final: [`components/ui/badge.tsx`](../../components/ui/badge.tsx) y [`app/globals.css`](../../app/globals.css).

> **Nota:** En el repo del profesor esto ya está hecho. Usar como demo en vivo.

---

## Ejercicio 2: Cambiar tamaño de página a 5

**Cuándo:** Después del Bloque 5  
**Objetivo:** Entender searchParams y paginación

### Tarea

Mostrar 5 productos por página en lugar de 10.

### Pasos

En `app/(dashboard)/products/page.tsx`, cambiar:

```typescript
const pageSize = Math.max(1, Number(params.page_size) || 5);
```

### Verificación

- Con 6+ productos en el API, aparece paginación "Página 1 de 2"
- URL `?page=2` muestra los siguientes registros

### Pregunta de reflexión

¿Qué ventaja tiene leer `page_size` de la URL en lugar de hardcodearlo solo en el código?

---

## Ejercicio 3: Agregar columna ID

**Cuándo:** Final del Bloque 5  
**Objetivo:** Modificar tabla shadcn

### Tarea

Agregar columna **ID** como primera columna de la tabla.

### Pasos

1. En `products-table.tsx`, agregar `<TableHead>ID</TableHead>` en el header
2. Agregar `<TableCell>{product.id}</TableCell>` en cada fila
3. Actualizar `colSpan` del empty state de 6 a 7

### Verificación

Cada fila muestra el ID numérico del producto.

### Solución orientativa

```tsx
<TableHead>ID</TableHead>
// ...
<TableCell className="font-mono text-muted-foreground">{product.id}</TableCell>
```

---

## Cómo el profesor los usa

| Momento | Ejercicio | Duración |
|---------|-----------|----------|
| Tras Bloque 5 | Ejercicio 3 (columna ID) | 5 min |
| Tras Bloque 5 | Ejercicio 2 (page_size) | 5 min |
| Demo rápida | Ejercicio 1 (badge) | 3 min (si ya está en repo, explicar) |

Si el tiempo apremia, asignar Ejercicio 3 como post-clase.

---

## Criterios de evaluación informal

- [ ] El estudiante sabe qué archivo modificar
- [ ] El cambio compila sin errores
- [ ] El cambio es visible en el navegador
- [ ] Puede explicar qué hizo en una frase
