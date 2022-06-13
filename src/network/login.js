import { request } from "./request"

export function startLogin(phone, password, captcha) {
    return request({
        url: "/login/cellphone",
        params: {
            phone, password, captcha
        }
    })
}

export function refreshLogin() {
    return request({
        url: "/login/refresh",
    })
}

export function checkLogin() {
    return request({
        url: "/login/status",
    })
}

export function getUserMsg() {
    return request({
        url: "/user/subcount",
    })
}

export function quitLogin() {
    return request({
        url: "/logout"
    })
}

export function getUserDetail(uid) {
    return request({
        url: "/user/detail",
        params: {
            uid
        }
    })
}

export function SendNum(phone) {
    return request({
        url: "/captcha/sent",
        params: {
            phone
        }
    })
}

export function startNumLogin(phone, captcha) {
    return request({
        url: "/captcha/verify",
        params: {
            phone, captcha
        }
    })
}