/*
@File    :   service.ts
@Time    :   2021/12/17 20:40:11
@Author  :   LisonLIN
@Contact :   lisonlin22@qq.com
@Desc    :   封装所有请求
*/
import Axios from "./instance";

// response
export interface HttpResponse {
    status: number;
    statusText: string;
    data: {
        code: number;
        msg: string;
        [key: string]: any;
    };
}

// 用户服务
class Service {
    api: string; // api 接口
    params?: any = {}; // 请求参数
    constructor(api: string, params: any = {}) {
        this.api = api;
        this.params = params;
    }
    public async get(): Promise<HttpResponse> {
        return Axios(this.api, {
            method: "get",
            responseType: "json",
            params: {
                ...this.params,
            },
        });
    }
    public async post(): Promise<HttpResponse> {
        return Axios(this.api, {
            method: "post",
            responseType: "json",
            data: {
                ...this.params,
            },
        });
    }
    public async put(): Promise<HttpResponse> {
        return Axios(this.api, {
            method: "put",
            responseType: "json",
            data: {
                ...this.params,
            },
        });
    }
    public async delete(): Promise<HttpResponse> {
        return Axios(this.api, {
            method: "delete",
            responseType: "json",
            data: {
                ...this.params,
            },
        });
    }
}
export { Service };
