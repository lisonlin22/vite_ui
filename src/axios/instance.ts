/*
@File    :   instance.ts
@Time    :   2023/04/14 21:59:24
@Author  :   Lison LIN
@Version :   1.0
@Contact :   lisonlin22@qq.com
@Desc    :   
*/
import { useRouter } from "vue-router"
import axios from "axios";
const instance = axios.create({
    timeout: 6 * 60 * 1000, // 30s
});

// 请求拦截器
instance.interceptors.request.use(
    (config: any) => {
        // 设置 token
        const token = window.localStorage.getItem("token");
        if (token) {
            config.headers["token"] = token;
        } else {
            // // 重定向 登陆页
            const router = useRouter()
            router.push({
                path: '/login'
            })
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
// 响应拦截器
instance.interceptors.response.use(
    // 返回接口 data
    (response) => {
        return response.data;
    },
    (error) => {
        const { response = {}, code } = error || {};
        return response.data
    }
);

// 暴露
export default instance;
