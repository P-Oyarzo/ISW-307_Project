// Main Application
// Initializes the app and handles user interactions

const App = {
    /**
     * Initialize the application
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadPopularMovies();
        console.log('CineGo initialized ✓');
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.searchResults = document.getElementById('search-results');
        this.navBtns = document.querySelectorAll('.nav-btn');
        this.modal = document.getElementById('movie-modal');
        this.modalClose = document.querySelector('.modal-close');
        this.modalOverlay = document.querySelector('.modal-overlay');
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Search button click
        this.searchBtn.addEventListener('click', () => this.handleSearch());

        // Search on Enter key
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Navigation buttons
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
        });

        // Modal close
        this.modalClose.addEventListener('click', () => UI.hideMovieModal());
        this.modalOverlay.addEventListener('click', () => UI.hideMovieModal());

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                UI.hideMovieModal();
            }
        });
    },

    /**
     * Handle search
     */
    async handleSearch() {
        const query = this.searchInput.value.trim();

        if (!query) {
            UI.showError('Por favor ingresa un término de búsqueda');
            return;
        }

        UI.hideError();
        UI.showLoading();
        this.searchResults.innerHTML = '';

        try {
            const data = await API.searchMovies(query);

            UI.hideLoading();

            if (data.results && data.results.length > 0) {
                UI.renderMovies(data.results, this.searchResults);
            } else {
                this.searchResults.innerHTML = '<p class="no-favorites">No se encontraron películas con ese término.</p>';
            }

        } catch (error) {
            UI.hideLoading();
            UI.showError('Error al buscar películas: ' + error.message);
        }
    },

    /**
     * Load popular movies on initial load
     */
    async loadPopularMovies() {
        UI.showLoading();

        try {
            const data = await API.getPopularMovies();
            UI.hideLoading();

            if (data.results) {
                UI.renderMovies(data.results, this.searchResults);
            }
        } catch (error) {
            UI.hideLoading();
            UI.showError('Error al cargar películas populares: ' + error.message);
        }
    },

    /**
     * Switch between views
     * @param {string} viewName - Name of view to show
     */
    switchView(viewName) {
        // Update nav buttons
        this.navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });

        // Update views
        const views = document.querySelectorAll('.view');
        views.forEach(view => {
            view.classList.toggle('active', view.id === `${viewName}-view`);
        });

        // Load content based on view
        if (viewName === 'favorites') {
            UI.renderFavorites();
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
