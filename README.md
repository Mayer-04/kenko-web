# Kenko EPS

Este es el sitio público de Kenko EPS. No es un panel administrativo ni una app con login complejo. Es la web que ve cualquier afiliado cuando necesita resolver algo rápido: dónde atenderse, cómo funciona el triage en urgencias, qué cubre su ruta de atención o cómo despejar una duda sin tener que llamar.

La idea es simple: información clara, que cargue rápido y se entienda bien en el celular.

Repositorio: `https://github.com/Mayer-04/kenko-web`

## De qué va

Kenko EPS es una Entidad Promotora de Salud. Este proyecto es su cara pública en la web. Reemplaza folletos y PDFs dispersos por un sitio estático, accesible y fácil de mantener.

Está pensado para tres momentos muy concretos:

- Alguien busca un punto de atención cercano y quiere dirección y horarios sin rodeos.
- Alguien llega a urgencias y no entiende por qué hay tiempos de espera distintos — ahí entra la explicación de triage por niveles.
- Alguien quiere saber qué incluye su ruta integral de atención o tiene una pregunta frecuente sobre trámites y afiliación.

Nada de dashboards. Solo contenido útil, bien estructurado y con buena lectura.

## Qué hay adentro

El sitio está dividido como lo pensaría un afiliado, no como lo piensa un sistema:

- **Inicio** — carrusel, accesos directos a servicios, equipo y datos de confianza.
- **Nosotros** — historia, misión y visión, objetivos estratégicos, valores y organigrama con el equipo directivo.
- **Afiliados** — el núcleo:
  - Rutas integrales de atención en salud
  - Puntos de atención
  - Preguntas frecuentes
  - Triage
- **Ingreso virtual** — acceso para pacientes.
- **404** — página de error con navegación para no dejar a nadie perdido.

Todo con rutas en español y en kebab-case, como se ve en la URL.

## Con qué está hecho

Se eligió lo justo para un sitio informativo que debe ser rápido y no necesita interactividad pesada.

- **Astro 7 con Vite** — estático por defecto, sin runtime de React. Solo se hidrata lo que lo necesita.
- **TypeScript** con configuración estricta de Astro.
- **Tailwind CSS 4** vía `@tailwindcss/vite`, con tema definido en `src/styles/global.css`.
- **Bun** como gestor de paquetes y para correr scripts. Node `>=22.22.3` requerido.
- **Fuentes locales** — Manrope y Figtree cargadas con `astro:assets`, sin depender de Google Fonts en producción.
- **Calidad** — ESLint + Prettier, Vitest + JSDOM + Testing Library para unitarias/integración, Playwright para pruebas de navegador.

No hay dependencias de más. Si no hace falta para mostrar contenido, no está.

## Antes de empezar

Necesitas tener instalado:

- Node `>=22.22.3` (revisa con `node -v`)
- Bun (recomendado). Si usas otro gestor, adapta los comandos, pero el proyecto está pensado para Bun.

Clona el repositorio y entra a la carpeta:

```bash
git clone https://github.com/Mayer-04/kenko-web.git
cd kenko-web
```

Instala dependencias:

```bash
bun install
```

## Ponerlo a andar

Para desarrollo con recarga al instante:

```bash
bun run dev
```

Abre `http://localhost:4321` en tu navegador.

Para verificar cómo queda la versión final:

```bash
bun run build
bun run preview
```

El build genera todo en `dist/` — esa carpeta no se edita a mano.

## Comandos que vas a usar

Todos están en `package.json`, pero estos son los del día a día:

```bash
bun run dev              # entorno de desarrollo
bun run build            # compila el sitio estático
bun run preview          # sirve el build para probarlo

bun run lint             # revisa con ESLint
bun run lint:fix         # corrige lo que se puede automáticamente
bun run format           # formatea con Prettier
bun run format:check     # solo verifica formato

bun run test:unit        # unitarias e integración con Vitest
bun run test:e2e         # construye y corre Playwright (Chromium, Firefox, WebKit)
bun run test:e2e:ui      # Playwright en modo UI
bun run test:e2e:debug   # Playwright en modo debug
bun run test:all         # todo: unitarias + e2e
```

Las pruebas e2e levantan un servidor de preview automáticamente, no necesitas tener `dev` corriendo.

## Cómo está organizado

```text
src/
  pages/          # rutas por archivo: index, nosotros, afiliados/*, ingreso-virtual
  components/     # piezas reutilizables (header, footer, home, nosotros, afiliados)
  layouts/        # Layout base con head, header y footer
  styles/         # global.css con tokens y configuración de Tailwind
  assets/         # imágenes, iconos y fuentes que procesa Astro
  utils/          # helpers como triage y faq
public/           # archivos sin procesar: favicons, manifest
tests/
  unit/           # pruebas unitarias
  e2e/            # pruebas de navegador
```

Alias configurados en `tsconfig.json`:

- `@components/*` -> `src/components/*`
- `@layouts/*` -> `src/layouts/*`
- `@assets/*` -> `src/assets/*`

Si agregas una página nueva, crea un `.astro` en `src/pages/` y hereda de `src/layouts/Layout.astro`. Para estilos, usa las utilidades de Tailwind y los tokens ya definidos en `global.css` antes de inventar colores nuevos.

## Diseño y accesibilidad

El tema parte de `src/styles/global.css`:

- Fondo `#f9fafb`, texto `#18181b`, primario `#21496a`, secundario `#ffb51b`, acento `#1e5bd7`.
- Tipografías: Figtree para títulos, Manrope para cuerpo.

El sitio está pensado mobile-first, con jerarquía clara y sin scroll horizontal. Se usan landmarks semánticos, jerarquía de encabezados, controles nativos y ARIA solo cuando hace falta. La idea es cumplir WCAG 2.2 AA: navegación por teclado, foco visible, contraste suficiente y respeto por `prefers-reduced-motion`.

Los SVG se importan como componentes de Astro cuando conviene, y las imágenes optimizadas usan `Image` de `astro:assets`.

## Equipo

Este sitio lo mantienen:

- Mayer Andres Chaves — [@Mayer-04](https://github.com/Mayer-04)
- Juan Pablo Rojas — [@jprojas87](https://github.com/jprojas87)
- José Rodriguez — [@jdanrr](https://github.com/jdanrr)

Si encuentras algo raro o quieres proponer un cambio, abre un issue o un pull request.

## Convenciones cortas

- Componentes en PascalCase, utilidades en camelCase, rutas públicas en español y kebab-case en minúsculas.
- Commits con Conventional Commits, por ejemplo `feat(site): add shared layout`.
- No edites a mano `dist/`, `.astro/` o `node_modules/`. Deja que Prettier y ESLint hagan su trabajo.

Con eso ya puedes correrlo, tocarlo y romperlo sin miedo. Cualquier duda, el código está bastante directo — empieza por `src/pages/index.astro` y `src/layouts/Layout.astro`.
