import request from '../utils/request' // 引入封装得axios

// 关于我
export function getAbout (data) {
    return request({
        url: '/about',
        method: 'POST',
        data
    })
}

// 关于我修改
export function aboutEdit (data) {
    return request({
        url: '/aboutEdit',
        method: 'POST',
        data
    })
}