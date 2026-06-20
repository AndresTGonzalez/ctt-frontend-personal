# Antes de la clase — Tarea previa

**Tiempo estimado:** 30–45 minutos  
**Obligatorio:** Completar antes de la sesión de code-along

---

## Objetivos

- Tener el entorno listo para codificar desde el minuto 1
- Entender conceptos mínimos de HTTP
- Conocer la estructura básica del proyecto

---

## 1. Instalar herramientas

### Node.js 20 o superior

1. Descarga desde [https://nodejs.org](https://nodejs.org) (versión LTS)
2. Instala con las opciones por defecto
3. Verifica en terminal:

```bash
node -v    # debe mostrar v20.x o superior
npm -v     # debe mostrar 10.x o superior
```

### Editor de código

Recomendado: **VS Code** o **Cursor**

Extensiones útiles (opcional):

- ESLint
- Tailwind CSS IntelliSense
- Pretty TypeScript Errors

### Git (opcional pero recomendado)

```bash
git --version
```

---

## 2. Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd ctt-frontend-personal
```

Si no usas Git, descarga el ZIP del repositorio y descomprímelo.

---

## 3. Levantar el backend FastAPI

El frontend necesita un API corriendo en `http://localhost:8000`.

Sigue las instrucciones de tu profesor para levantar el backend. Verifica que funciona:

```bash
curl http://localhost:8000/products/?page=1&page_size=10
```

Deberías ver un JSON con `"items"`, `"total"`, `"page"`, etc.

---

## 4. Instalar dependencias del frontend (opcional)

Si quieres adelantar trabajo:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Si el proyecto ya está construido, verás la app de productos.

---

## 5. Lectura previa (15 min)

Lee estos conceptos básicos. No necesitas memorizarlos; los profundizaremos en clase.

### HTTP — Los 4 métodos del CRUD

| Método | Operación | Ejemplo en nuestra app |
|--------|-----------|------------------------|
| GET | Leer | Listar productos, obtener uno |
| POST | Crear | Nuevo producto |
| PUT | Actualizar | Editar producto |
| DELETE | Eliminar | Borrar producto |

### Frontend vs Backend

```
┌─────────────┐         HTTP          ┌─────────────┐
│  Frontend   │  ◄─────────────────►  │  Backend    │
│  (Next.js)  │    JSON por red       │  (FastAPI)  │
│  Lo que ves │                       │  Datos/DB   │
└─────────────┘                       └─────────────┘
   localhost:3000                        localhost:8000
```

---

## 6. Qué traer a la clase

- [ ] Laptop con batería cargada
- [ ] Node.js 20+ instalado
- [ ] Repositorio clonado
- [ ] Backend probado (curl OK)
- [ ] Papel o app de notas para apuntes

---

## Preguntas de repaso

1. ¿Qué puerto usa el frontend? ¿Y el backend?
2. ¿Qué método HTTP usarías para crear un producto?
3. ¿Qué es el frontend en una aplicación web?

---

## Siguiente paso

En clase seguiremos el [code-along](../code-along/00-overview.md). Para estudiar conceptos antes, lee [¿Qué es el frontend?](01-que-es-el-frontend.md).
