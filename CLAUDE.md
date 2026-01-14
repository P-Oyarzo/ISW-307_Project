# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CineGo** - Progressive Web App (PWA) for searching movies using The Movie Database (TMDB) API.

This is a final project for ISW-307 (Mobile Programming) that demonstrates:
- REST API integration (RA5)
- JSON data handling (RA6)
- PWA capabilities (offline, installable)
- Mobile-first responsive design
- LocalStorage for data persistence

**Tech Stack:**
- Vanilla HTML5, CSS3, JavaScript (no build tools required)
- TMDB API for movie data
- Service Workers for offline functionality
- LocalStorage for favorites persistence

## Architecture

### Directory Structure

```
/
├── index.html              # Main HTML - app shell with search and favorites views
├── manifest.json           # PWA manifest for installability
├── service-worker.js       # Service worker for offline caching
├── css/
│   └── styles.css         # Mobile-first responsive styles with CSS variables
├── js/
│   ├── config.js          # API configuration (TMDB_API_KEY)
│   ├── api.js             # API module - all TMDB API calls
│   ├── storage.js         # LocalStorage module for favorites
│   ├── ui.js              # UI module - DOM manipulation and rendering
│   └── app.js             # Main app initialization and event handling
├── icons/                 # PWA icons (to be generated)
└── images/                # Project images
```

### Module Organization

**Separation of Concerns:**
The app follows a modular architecture with clear separation:

1. **config.js**: Central configuration (API keys, URLs, endpoints)
2. **api.js**: API layer - handles all HTTP requests to TMDB
   - `searchMovies(query)` - Search movies
   - `getMovieDetails(id)` - Get detailed movie info
   - `getPopularMovies()` - Fetch popular movies
   - `getPosterUrl()`, `getBackdropUrl()` - Build image URLs
3. **storage.js**: Data persistence layer using LocalStorage
   - `getFavorites()`, `addFavorite()`, `removeFavorite()`
   - `isFavorite()`, `toggleFavorite()`
4. **ui.js**: View layer - all DOM manipulation
   - `createMovieCard()` - Build movie card elements
   - `renderMovies()` - Render movie grids
   - `showMovieModal()` - Display movie details
   - `showLoading()`, `showError()` - UI feedback
5. **app.js**: Controller - initializes app and handles user interactions
   - Event binding (search, navigation, modal)
   - View switching (search ↔ favorites)

### Key Patterns

**Module Pattern**: Each JS file is a self-contained module exposing a public API
**Event-Driven**: User interactions trigger events that call appropriate modules
**Progressive Enhancement**: Works offline with cached content via Service Worker
**Mobile-First**: CSS designed for mobile, scales up to desktop

### Data Flow

1. User searches → `app.js` → `api.js` (fetch TMDB) → `ui.js` (render cards)
2. User clicks favorite → `ui.js` → `storage.js` (persist) → `ui.js` (update button)
3. User views details → `ui.js` → `api.js` (fetch details) → `ui.js` (show modal)
4. Offline mode → Service Worker intercepts fetch → returns cached data

## Development Commands

### Running the App

**Python HTTP Server (Recommended):**
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

**PHP Built-in Server:**
```bash
php -S localhost:8000
```

**Node.js http-server:**
```bash
npx http-server -p 8000
```

### Testing PWA Features

**Chrome DevTools:**
```bash
# 1. Open app in Chrome
# 2. F12 → Application tab
# 3. Check:
#    - Manifest
#    - Service Workers
#    - Cache Storage
#    - Local Storage (favorites)
```

**Mobile Simulation:**
```bash
# Chrome DevTools → Device Toolbar (Ctrl+Shift+M)
# Select device: iPhone 12 Pro, Pixel 5, etc.
```

**Install as PWA:**
```bash
# Chrome: Click ⊕ icon in address bar → Install
# Or: Menu → Install CineGo
```

### Testing Offline Mode

1. Load app with internet connection
2. Chrome DevTools → Network tab
3. Select "Offline" throttling
4. Refresh - app should still work with cached data

## Configuration Required

**Before running, you MUST configure the TMDB API key:**

1. Get API key from https://www.themoviedb.org/settings/api
2. Edit `js/config.js`:
   ```javascript
   const CONFIG = {
       API_KEY: 'YOUR_TMDB_API_KEY_HERE', // ← Replace this
       // ...
   };
   ```

## Common Development Tasks

### Adding New API Endpoints

1. Add endpoint to `js/config.js` ENDPOINTS object
2. Create method in `js/api.js` following existing pattern
3. Call from `js/app.js` or `js/ui.js`

### Modifying Styles

- Edit `css/styles.css`
- Uses CSS variables (defined in `:root`) for theming
- Mobile-first: base styles are mobile, use `@media (min-width)` for desktop

### Updating Service Worker Cache

When adding new files to cache:
1. Edit `service-worker.js` ASSETS_TO_CACHE array
2. Increment CACHE_NAME version (e.g., 'cinego-v2')

### Debugging

- Check browser console for errors
- Common issues:
  - "Invalid API key" → Check `js/config.js`
  - CORS errors → Must run via HTTP server (not file://)
  - Service Worker not registering → Use HTTPS or localhost

## Project Goals (Rúbrica)

This project demonstrates:
- ✅ REST API connectivity (TMDB API)
- ✅ JSON parsing and data handling
- ✅ Image loading (posters, backdrops)
- ✅ Data persistence (LocalStorage favorites)
- ✅ Responsive mobile UI
- ✅ PWA features (offline, installable)
- ✅ Modern UX patterns (loading states, error handling, modal)
