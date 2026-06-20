# Bloque 7: Editar y eliminar

**Duración:** 25 min  
**Objetivo:** Diálogos modales para actualizar y eliminar productos.

---

## Paso 1: Instalar componentes (3 min)

```bash
npx shadcn@latest add dialog alert-dialog skeleton -y
```

---

## Paso 2: EditProductDialog (12 min)

Crear `components/products/edit-product-dialog.tsx`:

**Props:** `productId`, `open`, `onOpenChange`

**Flujo:**

1. Al abrir (`useEffect` cuando `open && productId`):
   - `setIsLoading(true)`
   - `getProductById(productId)` Server Action
   - `setDefaultValues(data sin id)`
2. Mientras carga → Skeletons
3. Datos listos → `<ProductForm key={productId} defaultValues={...} />`
4. Submit → `updateProduct(id, data)` → toast → cerrar

**Importante:** `key={productId}` remonta el form al cambiar de producto.

Referencia: [`components/products/edit-product-dialog.tsx`](../../components/products/edit-product-dialog.tsx)

---

## Paso 3: DeleteProductDialog (5 min)

Crear `components/products/delete-product-dialog.tsx`:

- `AlertDialog` de shadcn
- Props: `productId`, `productName`, `open`, `onOpenChange`
- Mensaje: "Se eliminará permanentemente **{productName}**"
- Botón destructivo → `deleteProduct(id)`
- `event.preventDefault()` en onClick del AlertDialogAction

Referencia: [`components/products/delete-product-dialog.tsx`](../../components/products/delete-product-dialog.tsx)

---

## Paso 4: Integrar en ProductsTable (5 min)

En `components/products/products-table.tsx`:

```typescript
const [editId, setEditId] = useState<number | null>(null);
const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

// Botón Editar:
onClick={() => setEditId(product.id)}

// Botón Eliminar:
onClick={() => setDeleteTarget({ id: product.id, name: product.name })}

// Al final del JSX:
<EditProductDialog
  productId={editId}
  open={editId !== null}
  onOpenChange={(open) => { if (!open) setEditId(null); }}
/>
<DeleteProductDialog ... />
```

---

## Verificación ✅

- [ ] Editar: abre diálogo → skeleton → formulario precargado
- [ ] Guardar edición → toast → tabla actualizada
- [ ] Eliminar: pide confirmación → borra → tabla actualizada
- [ ] CRUD completo funcional

---

## Errores comunes

| Error | Solución |
|-------|----------|
| Dialog sin título | Agregar `DialogTitle` (accesibilidad) |
| Formulario con datos viejos | Usar `key={productId}` |
| Delete cierra antes de terminar | `preventDefault` en AlertDialogAction |

---

## Cierre de la sesión

1. Recorrer [arquitectura del proyecto](../estudiantes/04-arquitectura-del-proyecto.md)
2. Asignar [ejercicios post-clase](../ejercicios/ejercicios-post-clase.md)
3. Celebrar — construyeron un CRUD full-stack UI 🎉

---

## Plan B (si faltó tiempo)

| Omitido | Alternativa |
|---------|-------------|
| Precarga GET en editar | Pasar datos de la fila como props |
| Delete dialog | Botón directo con confirm() nativo |
| Paginación | Solo página 1 |

---

## Referencia final

Compara tu código con el repositorio completo. Todos los archivos tienen comentarios por sección.
