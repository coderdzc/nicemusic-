import axios from "axios";
export function request(config) {
    const instance = axios.create({
        baseURL: "http://47.106.89.75:3000",
        // baseURL: "http://localhost:3000/",
        timeout: 5000,
        withCredentials: true, //关键
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}