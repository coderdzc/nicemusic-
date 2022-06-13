import { request } from "./request"

export function getProfileRecord(uid, type) {
    return request({
        url: "/user/record",
        params: {
            uid, type
        }
    })
}
export function getProfileRank() {
    return request({
        url: "/user/level",
    })
}

export function getProfileSheet(uid) {
    return request({
        url: "/user/playlist",
        params: {
            uid
        }
    })
}


export function setDailySign(type) {
    return request({
        url: "/daily_signin",
        params: {
            type
        }
    })
}