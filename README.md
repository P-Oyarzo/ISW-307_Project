# 🎬 CineGo - Buscador de Películas

Progressive Web App (PWA) para buscar películas utilizando The Movie Database (TMDB) API. Proyecto final para ISW-307 - Programación Móvil.

## 🌐 Demo en Vivo

**[🚀 Ver Aplicación en Vivo](https://p-oyarzo.github.io/ISW-307_Project/)**

La aplicación está desplegada en GitHub Pages y lista para usar. Puedes probarla directamente desde tu navegador o instalarla como PWA en tu dispositivo móvil.

## 📋 Descripción

CineGo es una aplicación web progresiva que permite:
- 🔍 Buscar películas por título
- 📱 Experiencia móvil optimizada
- ❤️ Guardar películas favoritas
- 📡 Funcionalidad offline
- 📲 Instalable como aplicación nativa

## 🎯 Resultados de Aprendizaje

- **RA5**: Integración de servicios web REST
- **RA6**: Manejo de JSON y APIs externas

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: The Movie Database (TMDB)
- **Storage**: LocalStorage para favoritos
- **PWA**: Service Workers para funcionalidad offline
- **Design**: Mobile-first, responsive design

## 🚀 Instalación y Configuración

### 1. Obtener API Key de TMDB

1. Registrarse en [The Movie Database](https://www.themoviedb.org/)
2. Ir a [Configuración de API](https://www.themoviedb.org/settings/api)
3. Solicitar una API Key (gratis)
4. Copiar la API Key (v3 auth)

### 2. Configurar el Proyecto

1. Clonar el repositorio:
   ```bash
   git clone <repository-url>
   cd ISW-307_Project
   ```

2. Editar `js/config.js` y reemplazar `YOUR_TMDB_API_KEY_HERE` con tu API key:
   ```javascript
   const CONFIG = {
       API_KEY: 'tu_api_key_aqui',
       // ...
   };
   ```

### 3. Ejecutar la Aplicación

**Opción 1: Python Simple HTTP Server**
```bash
python3 -m http.server 8000
```

**Opción 2: PHP Built-in Server**
```bash
php -S localhost:8000
```

**Opción 3: Node.js http-server (requiere instalación)**
```bash
npx http-server -p 8000
```

**Opción 4: VS Code Live Server Extension**
- Instalar la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

Luego abrir en el navegador: `http://localhost:8000`

## 📱 Probar como PWA

1. Abrir la aplicación en Chrome/Edge
2. Abrir DevTools (F12) → Application → Manifest
3. Verificar que el manifest se carga correctamente
4. En el navegador, click en el ícono de instalación (⊕ en la barra de direcciones)
5. Instalar la aplicación

### Modo Móvil en Chrome DevTools

1. Abrir DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Seleccionar un dispositivo móvil (ej: iPhone 12 Pro)
4. Probar funcionalidad táctil y responsive

## 📂 Estructura del Proyecto

```
ISW-307_Project/
├── index.html              # Página principal
├── manifest.json           # Configuración PWA
├── service-worker.js       # Service Worker para offline
├── css/
│   └── styles.css         # Estilos responsive
├── js/
│   ├── config.js          # Configuración API
│   ├── api.js             # Módulo API TMDB
│   ├── storage.js         # Gestión LocalStorage
│   ├── ui.js              # Renderizado UI
│   └── app.js             # Lógica principal
├── icons/                 # Iconos PWA (pendiente)
├── images/                # Imágenes del proyecto
└── README.md
```

## ✨ Características Implementadas

### Funcionalidades Core
- ✅ Búsqueda de películas por título
- ✅ Visualización de resultados con pósters
- ✅ Detalles de películas (sinopsis, rating, géneros)
- ✅ Sistema de favoritos persistente
- ✅ Películas populares en página inicial

### PWA Features
- ✅ Manifest.json configurado
- ✅ Service Worker para caching
- ✅ Funcionalidad offline básica
- ✅ Instalable en dispositivos
- ✅ Responsive design mobile-first

### UI/UX
- ✅ Diseño mobile-first
- ✅ Dark theme optimizado
- ✅ Animaciones y transiciones
- ✅ Loading states
- ✅ Error handling
- ✅ Modal para detalles

## 🎨 Crear Iconos PWA

Para generar los iconos del PWA:

1. Crear un ícono base 512x512px (puede ser con emoji 🎬)
2. Usar [PWA Asset Generator](https://progressier.com/pwa-icons-and-ios-splash-screen-generator) o similar
3. Descargar y colocar en la carpeta `/icons/`

Alternativamente, usar un placeholder temporal:
```bash
# Crear iconos placeholder con ImageMagick
convert -size 512x512 xc:transparent -font Arial -pointsize 300 \
  -draw "text 100,350 '🎬'" icons/icon-512x512.png
```

## 📖 Referencias

- [The Movie Database API](https://developer.themoviedb.org)
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- Sanz, R. L. & Galán, R. (2014). *Introducción a la movilidad*

## 🐛 Solución de Problemas

### Error: "Invalid API key"
- Verificar que copiaste correctamente la API key en `js/config.js`
- Asegurar que la key esté activa en tu cuenta TMDB

### Service Worker no se registra
- Verificar que estés usando HTTPS o localhost
- Abrir DevTools → Application → Service Workers

### Imágenes no se muestran
- Verificar conexión a internet
- Revisar consola para errores de CORS

## 📝 Licencia

Proyecto académico para ISW-307 - Universidad [Nombre]

## 👨‍💻 Autor

[Tu Nombre] - ISW-307 Final Project
