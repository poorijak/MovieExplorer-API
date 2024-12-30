import apiConfig from "./apiConfig";
import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({ // สร้าง  axiosclient 
    baseURL : apiConfig.baseURL, // get baseulr 
    headers : {
        'Content-type' : 'application/json' // บอก sever ว่าส่งข้อมูลมาเป็น json
    },
    paramsSerializer : params => queryString.stringify({...params, api_key : apiConfig.apiKey}) // แปลง params จาก obj เป็น string เพื่อใช้กับ url เช่น param/api_key=APY_KEY
});

axiosClient.interceptors.request.use(async (config) => config) // ดักจับ req ที่ส่งไปที่ sever

axiosClient.interceptors.response.use((response) => { // ดักจับ res ที่ส่งกลับมา
    if (response && response.data) { // ถ้า resspon และ data มีค่า 
        return response.data; // ให้ return response.data
    }

    return response;

}, (error) => {
    throw error
});


export default axiosClient