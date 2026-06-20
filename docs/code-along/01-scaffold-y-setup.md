# Bloque 1: Scaffold y setup

**Duración:** 20 min  
**Objetivo:** Crear proyecto Next.js y verificar que corre en el navegador.

---

## Paso 1: Crear proyecto (10 min)

### Opción A — Desde cero (recomendado para code-along)

```bash
npx create-next-app@latest ctt-frontend-personal
```

Opciones sugeridas:

- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **No**
- App Router: **Yes**
- Turbopack: **Yes** (opcional)

```bash
cd ctt-frontend-personal
npm run dev
```

### Opción B — Branch starter (ahorra tiempo)

Si el profesor proporcionó branch `starter`:

```bash
git clone <repo>
cd ctt-frontend-personal
git checkout starter
npm install
npm run dev
```

---

## Paso 2: Explorar estructura (5 min)

Abre el proyecto en el editor. Identifica:

```
app/
├── layout.tsx    ← envuelve toda la app
├── page.tsx      ← ruta /
└── globals.css   ← estilos Tailwind
```

**Ejercicio:** cambia el texto en `app/page.tsx`, guarda, y observa la recarga automática.

---

## Paso 3: Verificar backend (5 min)

En otra terminal:

```bash
curl http://localhost:8000/products/?page=1&page_size=10
```

Debe devolver JSON. Si falla, levanta el backend antes de continuar.

---

## Verificación ✅

- [ ] `npm run dev` corre sin errores
- [ ] `http://localhost:3000` muestra página de Next.js
- [ ] `curl` al backend devuelve JSON de productos

---

## Errores comunes

| Error | Solución |
|-------|----------|
| `node: command not found` | Instalar Node.js 20+ |
| Puerto 3000 ocupado | Cerrar otro proceso o usar `npm run dev -- -p 3001` |
| Backend no responde | Verificar que FastAPI esté corriendo |

---

## Siguiente bloque

👉 [Bloque 2: shadcn y Tailwind](02-shadcn-y-tailwind.md)
