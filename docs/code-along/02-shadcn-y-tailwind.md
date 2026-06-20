# Bloque 2: shadcn y Tailwind

**Duración:** 25 min  
**Objetivo:** Inicializar shadcn/ui, configurar entorno y fuente Open Sans.

---

## Paso 1: Inicializar shadcn (10 min)

```bash
npx shadcn@latest init --defaults
```

Esto crea:

- `components.json`
- `lib/utils.ts` (función `cn()`)
- Actualiza `app/globals.css` con tokens

---

## Paso 2: Variables de entorno (5 min)

Crear `.env.example`:

```env
API_BASE_URL=http://localhost:8000
```

Copiar a `.env.local`:

```bash
cp .env.example .env.local
```

> La variable **no** usa `NEXT_PUBLIC_` porque solo el servidor debe conocerla.

---

## Paso 3: Dependencias de formularios (3 min)

```bash
npm install zod react-hook-form @hookform/resolvers
```

---

## Paso 4: Fuente Open Sans (7 min)

Editar `app/layout.tsx`:

```typescript
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// En <html>:
className={`${openSans.variable} h-full antialiased`}

// En <body>:
className={`${openSans.className} flex min-h-full flex-col`}
```

Referencia completa: [`app/layout.tsx`](../../app/layout.tsx)

---

## Paso 5: Instalar componentes base (opcional adelantar)

Puedes instalar ahora o en bloques posteriores:

```bash
npx shadcn@latest add button sonner tooltip -y
```

Agregar Toaster y TooltipProvider en `app/layout.tsx` (ver código final).

---

## Verificación ✅

- [ ] Existe `components.json` y `lib/utils.ts`
- [ ] `app/globals.css` tiene `@import "tailwindcss"` y `@theme inline`
- [ ] `.env.local` con `API_BASE_URL`
- [ ] Fuente Open Sans aplicada (inspeccionar en DevTools)

---

## Errores comunes

| Error | Solución |
|-------|----------|
| shadcn init falla por red | Verificar internet; reintentar |
| Fuente no cambia | Reiniciar `npm run dev`; hard refresh (Ctrl+Shift+R) |

---

## Conceptos para el profesor

- Tailwind v4: tema en CSS, no en `tailwind.config.js`
- shadcn copia componentes al repo (no es npm package tradicional)

---

## Siguiente bloque

👉 [Bloque 3: Capas de datos](03-capas-de-datos.md)
