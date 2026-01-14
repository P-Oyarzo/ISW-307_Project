// UI Module
// Handles all DOM manipulation and UI rendering

const UI = {
    /**
     * Create movie card element
     * @param {Object} movie - Movie object
     * @returns {HTMLElement} - Movie card element
     */
    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.movieId = movie.id;

        const posterUrl = API.getPosterUrl(movie.poster_path);
        const isFavorite = Storage.isFavorite(movie.id);
        const rating = movie.vote_average || 0;
        const ratingClass = rating >= 7 ? 'good' : rating >= 5 ? 'average' : 'poor';

        card.innerHTML = `
            ${posterUrl
                ? `<img src="${posterUrl}" alt="${movie.title}" class="movie-poster">`
                : `<div class="movie-poster placeholder">🎬</div>`
            }
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-movie-id="${movie.id}">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-rating ${ratingClass}">⭐ ${rating.toFixed(1)}</span>
                    <span class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                </div>
            </div>
        `;

        // Click on card to show details
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('favorite-btn')) {
                this.showMovieModal(movie.id);
            }
        });

        // Click on favorite button
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(movie, favoriteBtn);
        });

        return card;
    },

    /**
     * Render movies to a container
     * @param {Array} movies - Array of movie objects
     * @param {HTMLElement} container - Container element
     */
    renderMovies(movies, container) {
        container.innerHTML = '';

        if (!movies || movies.length === 0) {
            container.innerHTML = '<p class="no-favorites">No se encontraron películas.</p>';
            return;
        }

        movies.forEach(movie => {
            const card = this.createMovieCard(movie);
            container.appendChild(card);
        });
    },

    /**
     * Toggle favorite status of a movie
     * @param {Object} movie - Movie object
     * @param {HTMLElement} button - Favorite button element
     */
    toggleFavorite(movie, button) {
        const isFavorite = Storage.toggleFavorite(movie);

        button.textContent = isFavorite ? '❤️' : '🤍';
        button.classList.toggle('active', isFavorite);

        // Update favorites view if it's active
        const favoritesView = document.getElementById('favorites-view');
        if (favoritesView.classList.contains('active')) {
            this.renderFavorites();
        }
    },

    /**
     * Show movie details in modal
     * @param {number} movieId - Movie ID
     */
    async showMovieModal(movieId) {
        const modal = document.getElementById('movie-modal');
        const modalBody = document.getElementById('modal-body');

        modal.classList.remove('hidden');
        modalBody.innerHTML = '<div class="loading">Cargando detalles...</div>';

        try {
            const movie = await API.getMovieDetails(movieId);
            const backdropUrl = API.getBackdropUrl(movie.backdrop_path);
            const posterUrl = API.getPosterUrl(movie.poster_path);
            const isFavorite = Storage.isFavorite(movie.id);

            modalBody.innerHTML = `
                ${backdropUrl ? `<div class="modal-header" style="background-image: url('${backdropUrl}')"></div>` : ''}
                <div class="modal-body">
                    <h2 class="modal-title">${movie.title}</h2>
                    <div class="modal-details">
                        <span>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                        <span>📅 ${movie.release_date || 'N/A'}</span>
                        <span>⏱️ ${movie.runtime ? movie.runtime + ' min' : 'N/A'}</span>
                    </div>
                    ${movie.genres && movie.genres.length > 0 ? `
                        <div class="modal-genres">
                            ${movie.genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join('')}
                        </div>
                    ` : ''}
                    <p class="modal-overview">${movie.overview || 'Sin descripción disponible.'}</p>
                    <button class="search-btn ${isFavorite ? 'active' : ''}" id="modal-favorite-btn">
                        ${isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
                    </button>
                </div>
            `;

            // Add favorite toggle in modal
            const favoriteBtn = document.getElementById('modal-favorite-btn');
            favoriteBtn.addEventListener('click', () => {
                const newStatus = Storage.toggleFavorite(movie);
                favoriteBtn.textContent = newStatus ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos';
                favoriteBtn.classList.toggle('active', newStatus);

                // Update card in grid if visible
                const card = document.querySelector(`[data-movie-id="${movie.id}"]`);
                if (card) {
                    const cardBtn = card.querySelector('.favorite-btn');
                    cardBtn.textContent = newStatus ? '❤️' : '🤍';
                    cardBtn.classList.toggle('active', newStatus);
                }

                // Update favorites view if active
                const favoritesView = document.getElementById('favorites-view');
                if (favoritesView.classList.contains('active')) {
                    this.renderFavorites();
                }
            });

        } catch (error) {
            modalBody.innerHTML = `<div class="error-message">Error al cargar detalles: ${error.message}</div>`;
        }
    },

    /**
     * Hide movie modal
     */
    hideMovieModal() {
        const modal = document.getElementById('movie-modal');
        modal.classList.add('hidden');
    },

    /**
     * Show loading indicator
     */
    showLoading() {
        const loading = document.getElementById('loading');
        loading.classList.remove('hidden');
    },

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
    },

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');

        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 5000);
    },

    /**
     * Hide error message
     */
    hideError() {
        const errorElement = document.getElementById('error-message');
        errorElement.classList.add('hidden');
    },

    /**
     * Render favorites view
     */
    renderFavorites() {
        const favoritesGrid = document.getElementById('favorites-grid');
        const noFavorites = document.getElementById('no-favorites');
        const favorites = Storage.getFavorites();

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = '';
            noFavorites.classList.remove('hidden');
        } else {
            noFavorites.classList.add('hidden');
            this.renderMovies(favorites, favoritesGrid);
        }
    }
};
