import axios from "axios"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export const fetchTrending = async (type) => {
    try {
        const res = await axios.get(`${BASE_URL}/trending/${type}/week`, { params: { api_key: API_KEY, language: 'en-Us', page: 1 } })
        const results = res.data.results
        return results
    }
    catch (error) {
        console.log('Error Movietrending is : ', error)
        throw error;
    }
};


export const fetchPopular = async (type) => {
    try {
        // Fetch popular movies/shows
        const res = await axios.get(`${BASE_URL}/${type}/popular`, {
            params: { api_key: API_KEY, language: 'en-US' }
        });
        const results = res.data.results;

        // Fetch genre list
        const genresRes = await axios.get(`${BASE_URL}/genre/${type}/list`, {
            params: { api_key: API_KEY, language: 'en-US' }
        });
        const genres = genresRes.data.genres;

        // Map genre_ids to genre names
        const mapGenres = (genreIds) => genreIds.map(
            id => genres.find(genre => genre.id === id)?.name || "Unknown"
        );

        const moviesWithGenres = results.map(movie => ({
            ...movie,
            genres: mapGenres(movie.genre_ids), // Add genres to each movie
        }));

        return moviesWithGenres;
    } catch (error) {
        console.log('Error fetching popular with genres: ', error);
        throw error;
    }
};



export const fetchDetail = async (type, id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${type}/${id}`, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data
        return results
    }
    catch (err) {
        console.log('Error Detail : ', err);
        throw err;

    }
}

export const fetchGenres = async (type) => {
    try {
        const res = await axios.get(`${BASE_URL}/genre/${type}/list`, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.genres
        return results
    }
    catch (err) {
        console.log('Error Detail : ', err);
        throw err;
    }
}

export const fetchCasting = async (type, id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${type}/${id}/credits`, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.cast
        return results
    }
    catch (err) {
        console.log("casting error api : ", err)
        throw err;
    }
}


export const fetchSearch = async (type, searchTerm) => {
    try {
        const res = await axios.get(`${BASE_URL}/search/${type}?query=${searchTerm}&include_adult=false`, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.log("fetchSearch err api : ", err);
        throw err;

    }
}

export const fetchTopRate = async (type) => {
    try {
        const res = await axios.get((`${BASE_URL}/${type}/top_rated`), { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.log('fetchTopRated err api : ', err);
        throw err
    }
}

export const fetchOnAirSeries = async () => {
    try {
        const res = await axios.get((`${BASE_URL}/tv/on_the_air`), { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.log('fetchOnAirSerires err api : ', err);
        throw err
    }
}

export const fetchNowplayMovie = async () => {
    try {
        const res = await axios.get((`${BASE_URL}/movie/now_playing`), { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.log('fetchNowplayMovie err api : ', err);
        throw err
    }
}
export const fetchUpcoming = async () => {
    try {
        const res = await axios.get((`${BASE_URL}/movie/upcoming`), { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.log('fetchUpcoming err api : ', err);
        throw err
    }
}


export const fetchAiringSeries = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/tv/airing_today`, { params: { api_key: API_KEY, language: 'en-US' } });
        const results = res.data.results;
        return results;
    } catch (err) {
        console.log('fetchAiringSeries error: ', err);
        throw err;
    }
};



export const fetchSimilar = async (type, id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${type}/${id}/similar`, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.log('MovieSimilar is : ', err);
        throw err;
    }
}

export const fetchVideo = async (type, id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${type}/${id}/videos`, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.results
        return results
    }
    catch (err) {
        console.error("Error fetching video:", err);
        throw err;
    }
}


