// TMDB API Module
// Handles all API calls to The Movie Database

const API = {
    /**
     * Search movies by query
     * @param {string} query - Search term
     * @returns {Promise<Object>} - API response with movie results
     */
    async searchMovies(query) {
        if (!query || query.trim() === '') {
            throw new Error('La búsqueda no puede estar vacía');
        }

        const url = `${CONFIG.BASE_URL}${ENDPOINTS.SEARCH}?api_key=${CONFIG.API_KEY}&language=${CONFIG.LANGUAGE}&query=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    },

    /**
     * Get movie details by ID
     * @param {number} movieId - TMDB movie ID
     * @returns {Promise<Object>} - Movie details
     */
    async getMovieDetails(movieId) {
        const url = `${CONFIG.BASE_URL}${ENDPOINTS.MOVIE_DETAILS}/${movieId}?api_key=${CONFIG.API_KEY}&language=${CONFIG.LANGUAGE}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting movie details:', error);
            throw error;
        }
    },

    /**
     * Get popular movies
     * @returns {Promise<Object>} - Popular movies
     */
    async getPopularMovies() {
        const url = `${CONFIG.BASE_URL}${ENDPOINTS.POPULAR}?api_key=${CONFIG.API_KEY}&language=${CONFIG.LANGUAGE}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting popular movies:', error);
            throw error;
        }
    },

    /**
     * Get top rated movies
     * @returns {Promise<Object>} - Top rated movies
     */
    async getTopRatedMovies() {
        const url = `${CONFIG.BASE_URL}${ENDPOINTS.TOP_RATED}?api_key=${CONFIG.API_KEY}&language=${CONFIG.LANGUAGE}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting top rated movies:', error);
            throw error;
        }
    },

    /**
     * Build poster image URL
     * @param {string} posterPath - Poster path from API
     * @returns {string} - Full image URL
     */
    getPosterUrl(posterPath) {
        if (!posterPath) return null;
        return `${CONFIG.IMAGE_BASE_URL}/${CONFIG.POSTER_SIZE}${posterPath}`;
    },

    /**
     * Build backdrop image URL
     * @param {string} backdropPath - Backdrop path from API
     * @returns {string} - Full image URL
     */
    getBackdropUrl(backdropPath) {
        if (!backdropPath) return null;
        return `${CONFIG.IMAGE_BASE_URL}/${CONFIG.BACKDROP_SIZE}${backdropPath}`;
    }
};
