const apiConfig = {
    baseURL : process.env.NEXT_PUBLIC_BASE_URL ,
    apiKey : process.env.NEXT_PUBLIC_API_KEY ,
    originalImg : (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image : (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}   

export default apiConfig;