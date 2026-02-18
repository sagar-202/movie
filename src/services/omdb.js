import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

const omdbClient = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: API_KEY,
    },
});

// Debug Logging
omdbClient.interceptors.request.use(config => {
    console.log(`[Omdb API] Request: ${config.baseURL}`, config.params);
    return config;
});

omdbClient.interceptors.response.use(response => {
    console.log(`[Omdb API] Response for ${JSON.stringify(response.config.params)}:`, response.data);
    return response;
}, error => {
    console.error('[Omdb API] Error:', error);
    return Promise.reject(error);
});


export const searchMovies = async (query) => {
    try {
        const response = await omdbClient.get('', {
            params: {
                s: query,
                type: 'movie',
            },
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error);
        }

        return response.data.Search;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (imdbID) => {
    try {
        const response = await omdbClient.get('', {
            params: {
                i: imdbID,
            },
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error);
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching movie details for ID ${imdbID}:`, error);
        throw error;
    }
};

export const getMoviesByKeyword = async (keyword) => {
    // Utilizing the same searchMovies function but explicitly named for clarity as requested
    return await searchMovies(keyword);
};

export default {
    searchMovies,
    getMovieDetails,
    getMoviesByKeyword,
};
