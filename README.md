# 🕹️ Martin Rotelli — Interactive Portfolio & CV

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Automated_Deploy-22c55e?style=for-the-badge&logo=github)](https://pages.github.com/)

> **"Code. Deploy. Improve. Repeat"**  
> CV y Portafolio interactivo para **Martin Rotelli** (`~/martinrot`), Frontend & Full Stack Developer especializado en React 19, Next.js (App Router, SSR, ISR), TypeScript y Firebase. Incluye un modo interactivo de destrucción con físicas 2D en tiempo real inspirado en *Sprite Fusion*.

---

## 🌟 Características Principales

### 👔 1. Modo Dual (Recruiter / Developer)
* **Modo Recruiter (Por defecto):** Lectura rápida y concisa orientada a métricas de impacto comercial, logros técnicos, proyectos en producción y botón de exportación limpia a PDF con reglas optimizadas `@media print`.
* **Modo Developer:** Análisis técnico en profundidad con especificaciones de arquitectura, patrones de diseño y decisiones de ingeniería en cada proyecto.

### 🌐 2. Soporte Bilingüe (Español / Inglés)
* Selector de idioma instantáneo (`[ ES | EN ]`) en la barra de navegación.
* Traduce dinámicamente toda la interfaz: biografía, proyectos, roles, métricas, trayectoria laboral, educación, tecnologías y mensajes del minijuego.

### 🎮 3. Modo Caos (Minijuego de Destrucción 2D)
Inspirado en la mecánica de [`destroy.spritefusion.com`](https://destroy.spritefusion.com/):
* **Personaje retro pixel-art con físicas de gravedad:** Corre y salta sobre las tarjetas y secciones de la web en tiempo real.
* **Superficies sólidas dinámicas:** No solo te puedes parar sobre las tarjetas de proyectos, ¡sino también sobre los **chips individuales de tecnologías** (`React 19`, `TypeScript`, `Next.js`), botones, encabezados y la barra de navegación!
* **Mecánicas de movilidad fluida:**
  * **Doble Salto (Double Jump):** Salto secundario en el aire con pulso de energía y aviso visual.
  * **Propulsores Jetpack:** Mantén presionado el salto en el aire para planear con estela de partículas de fuego.
  * **Super Impulso (Tecla `R` / `Shift` / Botón HUD):** Cohete propulsor para salir rápidamente del piso inferior.
  * **Cámara con Auto-Scroll:** La página web se desplaza verticalmente siguiendo los saltos del personaje.
* **Arsenal de 3 armas:**
  1. `[1] Láser Blaster`: Disparo rápido de alta cadencia.
  2. `[2] Bazooka`: Cohete con estela de humo y daño de área explosivo.
  3. `[3] Martillo Demoledor`: Onda de choque cuerpo a cuerpo de alto impacto.
* **Sistema de daño, loot y partículas:**
  * Las tarjetas tiemblan, muestran barra de salud y explotan en fragmentos de código (`<div/>`, `{ }`, `TS`, `Next.js`).
  * Los elementos destruidos dejan caer cajas de **Loot** que suman puntos al recolectarlas.
* **Sintetizador de sonido 8-bit (Web Audio API):**
  * Efectos sonoros generados proceduralmente por el navegador (sin archivos de audio externos pesados).
* **Botón `git checkout --hard`:**
  * Reproduce una fanfarria triunfal, dispara confeti (`canvas-confetti`) y restaura todos los componentes destruidos a su estado original.
* **Controles táctiles virtuales:**
  * D-Pad y botones táctiles en pantalla para jugar cómodamente en móviles y tablets.

---

## 🚀 Proyectos Destacados Incluidos

1. **[Playoff](https://jugaplayoff.com):** Plataforma SaaS integral para gestión de clubes deportivos con generación automática de sitios públicos institucionales, SSR/ISR, Firebase Firestore y pasarela Mercado Pago para cobro de cuotas.
2. **[Paren La Pelota Futsal](https://parenlapelotafutsal.com.ar):** Plataforma web deportiva de alto tráfico con **+500.000 visitas anuales**, monetización mediante Google AdSense, SSR/ISR y SEO técnico.
3. **[Futsalero (Browser Game)](https://github.com/MartinRot/futsalero):** Simulador de carrera y juego de navegador de futsal con motor de simulación propio en TypeScript (+240 KB), generación de relatos por IA (Groq) e internacionalización (`next-intl`).
4. **[Paren La Pelota (Fútbol 11)](https://parenlapelota.com.ar):** Ecosistema para ligas y torneos juveniles AFA con fixtures, tablas y renderizado gráfico DOM-to-Canvas para Instagram.
5. **[Foro Tigre](https://github.com/martinrot):** Comunidad y portal de noticias PWA con Service Workers (Serwist), Firebase Firestore y TanStack Query.
6. **[Invicu](https://github.com/martinrot):** Plataforma de eventos y ticketing con pasarelas de pago duales (Mercado Pago y PayPal) y credenciales QR dinámicas.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Framework Web** | Next.js 16 (App Router, Turbopack, Static Export) |
| **Librería UI** | React 19 |
| **Lenguaje** | TypeScript 5 (Strict Mode) |
| **Estilos** | Tailwind CSS v4 |
| **Animaciones & FX** | HTML5 Canvas 2D, Framer Motion, canvas-confetti |
| **Iconografía** | Lucide Icons + Custom SVG Brand Icons |
| **Audio** | Web Audio API (8-bit procedural synthesizer) |
| **Despliegue** | GitHub Pages mediante GitHub Actions |

---

## 💻 Instalación y Desarrollo Local

### Prerrequisitos
* Node.js v18.17+ o superior (probado en Node.js v20/v24).
* npm, pnpm o yarn.

### 1. Clonar el repositorio
```bash
git clone https://github.com/martinrot/cv.git
cd cv
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la web.

### 4. Compilar la versión de producción (Static Export)
```bash
npm run build
```
Generará los archivos estáticos listos para desplegar en la carpeta `./out`.

---

## 📦 Despliegue en GitHub Pages

El proyecto cuenta con un script de despliegue optimizado para **GitHub Pages** (vía rama `gh-pages`):

1. **Desplegar con un solo comando:**
   ```bash
   npm run deploy
   ```
   Este comando compila la exportación estática con Turbopack configurando el `basePath: '/cv'`, genera el archivo `.nojekyll` y publica automáticamente la versión compilada en la rama `gh-pages` de tu repositorio.

2. **Configuración en GitHub:**
   - Ve a tu repositorio en GitHub: **Settings** -> **Pages**.
   - En **Source**, selecciona **Deploy from a branch**.
   - Selecciona la rama **`gh-pages`** y carpeta **`/(root)`**, luego guarda.
   - ¡Tu web quedará activa en `https://martinrot.github.io/cv/`!

---

## 👤 Autor

**Martin Rotelli**
* **GitHub:** [@martinrot](https://github.com/martinrot)
* **LinkedIn:** [linkedin.com/in/martin-rotelli](https://www.linkedin.com/in/martin-rotelli)
* **Email:** [martin_rot@hotmail.com](mailto:martin_rot@hotmail.com)

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta `LICENSE` para más información.
