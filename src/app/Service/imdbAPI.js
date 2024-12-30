import axios from "axios"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export const fetchTrending = async (type) => {
    try {
        const res = await axios.get(`${BASE_URL}/trending/${type}/week`, { params: { api_key: API_KEY, language: 'en-Us' } })
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
        const res = await axios.get(`${BASE_URL}/${type}/popular`, { params : { api_key : API_KEY , language : 'en-Us'}} )
        const results = res.data.results
        return results
    }
    catch (error) {
        console.log('Error Movietrending is : ', error)
        throw error;
    }
};


export const fetchDetail = async (type , id) => {
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

export const fetchCasting = async (type , id) => {
    try {
        const res = await axios.get(`${BASE_URL}/${type}/${id}/credits `, { params: { api_key: API_KEY, language: 'en-Us' } })
        const results = res.data.cast
        return results
    }
    catch (err) {
        console.log("casting error api : ", err)
        throw err;
    }
}



export const fetchSimilar = async (type , id) => {
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
