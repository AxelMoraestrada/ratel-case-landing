# RA'TEL CASE — Landing Page Corporativa

Landing page profesional para RA'TEL CASE, empresa peruana de accesorios para celulares y productos tecnológicos.

---

## Tecnologías

- **React 19** + **Vite 8**
- **Tailwind CSS 3**
- **Framer Motion** — animaciones y transiciones
- **@react-google-maps/api** — mapa interactivo
- **React Icons** — iconografía
- **Manrope + Inter** (Google Fonts)

---

## Instalación y desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Google Maps (opcional — ver sección de configuración)
cp .env.example .env
# Edita .env y pega tu API key

# 3. Iniciar servidor de desarrollo
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview  # previsualizar el build
```

---

## Configuración de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita **Maps JavaScript API**
4. Crea una API Key en *Credenciales*
5. (Recomendado) Restringe la key a tu dominio
6. Edita `.env`:

```env
VITE_GMAPS_KEY=AIzaSy...tu_clave_aquí
```

> Sin API key, el mapa muestra un placeholder con accesos directos a Google Maps para cada sede. La web funciona perfectamente sin él.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Navegación fija con glassmorphism
│   │   └── Footer.jsx        # Footer completo con redes y contacto
│   ├── sections/
│   │   ├── Hero.jsx          # Hero con dot-grid interactivo y canvas
│   │   ├── SobreNosotros.jsx # Historia, misión, visión, valores
│   │   ├── Productos.jsx     # Grid de 6 productos con hover avanzado
│   │   ├── Beneficios.jsx    # 6 cards de beneficios + CTA banner
│   │   ├── BuscadorSedes.jsx # Geolocalización + selector de distrito
│   │   ├── MapaSedes.jsx     # Google Maps con marcadores y InfoWindows
│   │   ├── Testimonios.jsx   # 4 cards de reseñas con calificación
│   │   ├── FAQ.jsx           # Acordeón animado con 6 preguntas
│   │   └── Contacto.jsx      # Formulario con validación + CTA WhatsApp
│   └── ui/
│       └── WhatsAppButton.jsx # Botón flotante con tooltip animado
├── data/
│   ├── sedes.js              # ← Agregar nuevas sedes aquí
│   ├── productos.js          # ← Agregar/editar productos aquí
│   ├── testimonios.js        # ← Editar testimonios aquí
│   └── faqs.js               # ← Editar preguntas frecuentes aquí
├── hooks/
│   └── useGeolocation.js     # Hook de geolocalización del navegador
├── utils/
│   └── distance.js           # Cálculo de distancia Haversine
├── styles/
│   └── globals.css           # Sistema de diseño: variables, clases base
└── App.jsx                   # Composición principal de secciones
```

---

## Cómo reemplazar imágenes

### Imágenes de productos (`src/data/productos.js`)
Cambia el campo `img` de cada producto:

```js
{
  id: 1,
  nombre: "Cases Premium",
  img: "/images/products/cases-premium.jpg",  // ← ruta local
  // o una URL de CDN:
  img: "https://tu-cdn.com/cases.jpg",
}
```

### Imágenes de testimonios (`src/data/testimonios.js`)
Cambia el campo `avatar`:

```js
{
  avatar: "/images/clientes/carlos.jpg",  // ← foto real del cliente
}
```

### Imagen del hero (`src/components/sections/Hero.jsx`)
Busca la etiqueta `<img>` dentro del card flotante y cambia el `src`:

```jsx
<img src="/images/hero-product.jpg" alt="Accesorios para celular" ... />
```

**Carpeta recomendada:** `public/images/` → acceso directo con `/images/nombre.jpg`

---

## Agregar una nueva sede

En `src/data/sedes.js`, agrega un nuevo objeto al array `sedes`:

```js
{
  id: 4,
  nombre: "Miraflores",
  direccion: "Av. Larco 500",
  distrito: "Miraflores",
  departamento: "Lima",
  lat: -12.121,
  lng: -77.030,
  horario: "Lun-Sáb: 9am–8pm | Dom: 10am–6pm",
  telefono: "+51 999 000 004",
  referencia: "Frente al Parque Kennedy",
},
```

La sede aparecerá automáticamente en el buscador, el mapa y el footer.

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_GMAPS_KEY` | API Key de Google Maps JavaScript API |

---

## SEO

El archivo `index.html` incluye:
- Meta title y description optimizados
- Open Graph (Facebook/LinkedIn)
- Twitter Card
- Etiquetas semánticas (`main`, `section`, `nav`, `footer`)
- Atributos `alt` en todas las imágenes

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | Buscar `51999000000` en todo el proyecto |
| Colores de marca | `tailwind.config.js` → `theme.extend.colors.brand` |
| Tipografía | `src/styles/globals.css` → `@import url(...)` |
| Redes sociales | `src/components/layout/Footer.jsx` → array `redes` |
| Horarios | `src/data/sedes.js` → campo `horario` |
| Correo de contacto | `src/components/layout/Footer.jsx` |
