import Axios from 'axios'
import {ElMessage} from "element-plus";
const axios = Axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000, // 超时
    baseURL: '/admin' // 请求接口地址，这里使用本项目地址，因为我们是前后端分离，后面需要在vue.config.js里面配置代理，实际请求得地址不是这个。
    // baseURL: 'http://localhost:8080/api' // 请求接口地址，这里使用本项目地址，因为我们是前后端分离，后面需要在vue.config.js里面配置代理，实际请求得地址不是这个。
})

// 请求拦截
axios.interceptors.request.use(req => {
    if (req.method === 'get') {
        const url = req.url
        const t = new Date().getTime()
        if (url.indexOf('?') >= 0) {
            req.url = `${url}&t=${t}`
        } else {
            req.url = `${url}?t=${t}`
        }
    }
    return req
})

// 响应拦截
axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        // 响应失败统一处理
        const { response } = error
        if (response) {
            switch (response.status) {
                case 400:
                    ElMessage({
                        message: '请求无效 400',
                        type: 'error',
                    })
                    break
                case 401:
                    ElMessage({
                        message: '尚未登录请重新登录 401',
                        type: 'error',
                    })
                    break
                case 403:
                    ElMessage({
                        message: '您没有权限这样做，请联系管理员 403',
                        type: 'error',
                    })
                    break
                case 404:
                    ElMessage({
                        message: '请求未找到 404',
                        type: 'error',
                    })
                    break
                case 500:
                    ElMessage({
                        message: '系统异常 500',
                        type: 'error',
                    })
                    break
                case 504:
                    ElMessage({
                        message: '请求超时，请稍后再试 504',
                        type: 'error',
                    })
                    break
                default:
                    ElMessage({
                        message: '系统异常',
                        type: 'error',
                    })
                    break
            }
        }
        return Promise.reject(error)
    }
)
export default axios