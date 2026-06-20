# Preguntas frecuentes y errores comunes

Referencia rápida para resolver problemas durante el code-along en vivo.

---

## Setup e instalación

### "node: command not found"

**Causa:** Node.js no instalado o no en el PATH.

**Solución:** Instalar Node.js 20+ desde [nodejs.org](https://nodejs.org). Reiniciar terminal. Verificar con `node -v`.

---

### "npm install" falla con errores de red

**Causa:** Proxy, firewall o red inestable.

**Solución:** Reintentar. Si persiste, usar hotspot móvil. Verificar que no haya VPN bloqueando npm.

---

### "shadcn init" falla con error de registry

**Causa:** Sin acceso a ui.shadcn.com.

**Solución:** Verificar internet. Reintentar con `npx shadcn@latest init --defaults`. Si falla en sandbox/CI, ejecutar fuera de restricciones de red.

---

## Backend y API

### "Error al cargar productos" en la página

**Causa:** Backend FastAPI no está corriendo en `localhost:8000`.

**Solución:**

1. Verificar que el backend esté levantado
2. Probar: `curl http://localhost:8000/products/?page=1&page_size=10`
3. Verificar `.env.local` tiene `API_BASE_URL=http://localhost:8000`

---

### "Error 404" o "Connection refused"

**Causa:** URL incorrecta o puerto distinto.

**Solución:** Confirmar puerto del backend. Actualizar `API_BASE_URL` en `.env.local`. Reiniciar `npm run dev` tras cambiar `.env`.

---

## Next.js y TypeScript

### "searchParams is a Promise" / Type error con searchParams

**Causa:** Next.js 16 requiere `await searchParams`.

**Solución:**

```typescript
// Incorrecto (Next.js 14)
export default function Page({ searchParams }) {
  const page = searchParams.page;
}

// Correcto (Next.js 16)
export default async function Page({ searchParams }) {
  const params = await searchParams;
  const page = params.page;
}
```

---

### "You're importing a component that needs useState..."

**Causa:** Hook usado en Server Component (falta `"use client"`).

**Solución:** Agregar `"use client"` como primera línea del archivo que usa `useState`, `useEffect`, `onClick`, etc.

---

### Conflicto de rutas: dos `page.tsx` en `/`

**Causa:** Existe `app/page.tsx` y `app/(dashboard)/page.tsx` al mismo tiempo.

**Solución:** Eliminar `app/page.tsx` y dejar solo `app/(dashboard)/page.tsx` con el redirect.

---

## Formularios y validación

### Zod: "Expected number, received string"

**Causa:** Inputs HTML devuelven strings.

**Solución:** Usar `valueAsNumber: true` en register:

```typescript
{...form.register("price", { valueAsNumber: true })}
```

---

### Formulario no envía / botón no responde

**Causa:** Falta `type="submit"` en Button o `onSubmit` mal conectado.

**Solución:** Verificar `<form onSubmit={handleSubmit}>` y `<Button type="submit">`.

---

## UI y shadcn

### Sidebar no aparece / layout roto

**Causa:** Falta `SidebarProvider` o componentes shadcn no instalados.

**Solución:**

```bash
npx shadcn@latest add sidebar
```

Verificar que `(dashboard)/layout.tsx` envuelve con `SidebarProvider`.

---

### Toasts no aparecen

**Causa:** Falta `<Toaster />` en root layout.

**Solución:** Agregar en `app/layout.tsx`:

```tsx
import { Toaster } from "@/components/ui/sonner";
// dentro del body:
<Toaster richColors position="top-right" />
```

---

### Tooltips del sidebar no funcionan

**Causa:** Falta `TooltipProvider`.

**Solución:** Envolver children en `app/layout.tsx` con `<TooltipProvider>`.

---

## CORS (pregunta conceptual)

### "¿Por qué no hacemos fetch directo desde el navegador al API?"

**Respuesta para estudiantes:**

> Si el frontend (localhost:3000) llama directo al backend (localhost:8000), el navegador aplica **CORS** y puede bloquear la petición. Con **Server Actions**, la petición sale del servidor Next.js, no del navegador. No hay CORS y la URL del API no se expone al cliente.

---

## Git y code-along

### Estudiante muy atrasado

**Opciones:**

1. `git stash` + `git checkout` al tag/commit del bloque anterior
2. Pair programming con compañero al día
3. Clonar repo final y estudiar diff después

---

## Preguntas que suelen hacer los estudiantes

| Pregunta | Respuesta corta |
|----------|-----------------|
| ¿Qué es React? | Librería para construir interfaces con componentes reutilizables |
| ¿Qué es Next.js? | Framework sobre React que añade rutas, servidor y optimizaciones |
| ¿Server vs Client Component? | Server = en el servidor, sin interactividad. Client = en el navegador, con clics y estado |
| ¿Para qué TypeScript? | Detectar errores antes de ejecutar; autocompletado en el editor |
| ¿Para qué Zod? | Validar que los datos del formulario cumplan reglas antes de enviarlos |
| ¿Qué es revalidatePath? | Refrescar una página en caché tras cambiar datos |

---

## Contacto de escalación

Si un error no está en esta lista y bloquea a más del 50% de la clase:

1. Pausar 5 min
2. Mostrar solución en pantalla del profesor
3. Estudiantes copian/compare diff
4. Documentar el error aquí después de clase para futuras sesiones
