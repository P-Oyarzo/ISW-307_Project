// TMDB API Configuration
// Get your API key from: https://www.themoviedb.org/settings/api

const CONFIG = {
    API_KEY: '7dcf657287cfc3a8d68a58cf31f807a1',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    POSTER_SIZE: 'w500',
    BACKDROP_SIZE: 'w1280',
    LANGUAGE: 'es-ES'
};

// API Endpoints
const ENDPOINTS = {
    SEARCH: '/search/movie',
    MOVIE_DETAILS: '/movie',
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated'
};
