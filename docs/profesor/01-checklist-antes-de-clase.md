# Checklist antes de clase

Usa esta lista el día anterior y 30 minutos antes de empezar.

---

## Día anterior

### Entorno del profesor

- [ ] Node.js 20+ instalado (`node -v`)
- [ ] Repositorio clonado y `npm install` sin errores
- [ ] Backend FastAPI corriendo en `http://localhost:8000`
- [ ] Probar endpoint: `curl http://localhost:8000/products/?page=1&page_size=10`
- [ ] Frontend corre: `npm run dev` → `http://localhost:3000/products`
- [ ] CRUD completo probado manualmente (crear, editar, eliminar)

### Material

- [ ] [Guion de clase](00-guion-de-clase.md) leído
- [ ] [FAQ](02-preguntas-frecuentes.md) a mano por si hay errores en vivo
- [ ] Proyector / pantalla compartida probada
- [ ] Editor con fuente grande (zoom 125–150%) para que se lea en sala

### Comunicación a estudiantes

- [ ] Enviar enlace al repo
- [ ] Enviar [00-antes-de-la-clase.md](../estudiantes/00-antes-de-la-clase.md) como tarea previa
- [ ] Confirmar que tienen Node.js 20+ instalado
- [ ] Compartir URL del backend o indicar que deben levantarlo localmente

---

## 30 minutos antes

### Infraestructura

- [ ] WiFi estable (o plan B: hotspot)
- [ ] Backend FastAPI levantado
- [ ] Terminal con `npm run dev` corriendo
- [ ] Navegador en `http://localhost:3000/products` (pestaña lista para demo)

### Opcional: branch `starter`

Si creaste un branch `starter` con create-next-app limpio (sin shadcn ni productos):

- [ ] Branch pusheado al remoto
- [ ] Estudiantes saben hacer `git checkout starter` al inicio del Bloque 2

### Sala / remoto

- [ ] Agua, pizarra o Miro para diagramas
- [ ] Chat o canal para compartir links durante la clase
- [ ] Plan B si internet falla: demo offline con proyecto ya construido

---

## Al iniciar la clase (5 min)

- [ ] Preguntar quién completó la tarea previa
- [ ] Ayuda rápida a quien no tenga Node instalado (pair con compañero si es posible)
- [ ] Mostrar demo final (2 min) para motivar
- [ ] Compartir link a [docs/README.md](../README.md)

---

## Checklist por bloque (durante la clase)

| Bloque | Verificar antes de continuar |
|--------|------------------------------|
| 2 | Todos con `npm run dev` OK |
| 3 | Todos con `shadcn init` OK |
| 4 | Backend respondiendo; al menos `getProducts` funciona |
| 5 | Sidebar visible |
| 6 | Tabla con datos |
| 7 | Al menos crear producto funciona |

Si más del 30% de la clase va atrasada en un checkpoint, activar [Plan B del guion](00-guion-de-clase.md#plan-b--si-van-atrasados).
