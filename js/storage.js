// Local Storage Module
// Manages favorites using browser's localStorage

const Storage = {
    FAVORITES_KEY: 'cinegoFavorites',

    /**
     * Get all favorite movies
     * @returns {Array} - Array of favorite movie objects
     */
    getFavorites() {
        try {
            const favorites = localStorage.getItem(this.FAVORITES_KEY);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Error getting favorites:', error);
            return [];
        }
    },

    /**
     * Add movie to favorites
     * @param {Object} movie - Movie object to add
     */
    addFavorite(movie) {
        try {
            const favorites = this.getFavorites();

            // Check if movie already exists
            if (!favorites.find(fav => fav.id === movie.id)) {
                favorites.push(movie);
                localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error adding favorite:', error);
            return false;
        }
    },

    /**
     * Remove movie from favorites
     * @param {number} movieId - Movie ID to remove
     */
    removeFavorite(movieId) {
        try {
            const favorites = this.getFavorites();
            const filtered = favorites.filter(movie => movie.id !== movieId);
            localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error removing favorite:', error);
            return false;
        }
    },

    /**
     * Check if movie is in favorites
     * @param {number} movieId - Movie ID to check
     * @returns {boolean} - True if movie is favorite
     */
    isFavorite(movieId) {
        const favorites = this.getFavorites();
        return favorites.some(movie => movie.id === movieId);
    },

    /**
     * Toggle favorite status
     * @param {Object} movie - Movie object
     * @returns {boolean} - New favorite status
     */
    toggleFavorite(movie) {
        if (this.isFavorite(movie.id)) {
            this.removeFavorite(movie.id);
            return false;
        } else {
            this.addFavorite(movie);
            return true;
        }
    },

    /**
     * Clear all favorites
     */
    clearFavorites() {
        try {
            localStorage.removeItem(this.FAVORITES_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    }
};
