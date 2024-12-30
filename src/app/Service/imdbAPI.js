    import axiosClient from "./axiosClient";

    export const category = {
        movie : 'movie',
        tv : 'tv'
    }

    export const movieType = {
        upcoming : 'upcoming',
        popular : 'popular',
        top_rated : 'top_rated',
        trending : 'trending'
    }

    export const tvType = {
        popular : 'popular',
        top_rated : 'top_rated' , 
        on_the_air : 'on_the_air',
        trending : 'trending'
    }
    const tmdbApi = {
        getMovieList : (type , params) => {
            const url = `/movie/${movieType[type]}`;
            return axiosClient.get(url , params);
        },
        getTvList : (type , params) => {
            const url = `/tv/${tvType[type]}`
            return axiosClient.get(url , params)
        },
        getVideo : (cate , id) => {
            const url = `${category[cate]}/${id}/video`;
            return axiosClient.get(url , {params : {}})
        }, 
        datail : (cate  , id , params) => {
            const url = `${category[cate]}/${id}`
            return axiosClient.get(url , params)
        },
        credits : (cate , id ) => {
            const url = `${category[cate]}/${id}/credits`
            return axiosClient.get(url , {params : {}})
        },
        similar : (cate , id ) => {
            const url = `${category[cate]}/${id}/similar`
            return axiosClient.get(url , {params : {}})
        },
        genre : (cate) => {
            const url = `/genre/${category[cate]}/list`
            return axiosClient.get(url , {params : {}})
        }
    }

    export default tmdbApi;