import { request } from "./request";

export function getHomeSwiper() {
    return request({
        url: "/banner"
    })
}

export function getHomeSongSheet(limit) {
    return request({
        url: "/personalized",
        params: {
            limit,
        }

    })
}

export function getHomeNewSong() {
    return request({
        url: "/personalized/newsong"
    })
}

export function getHomeSinger(limit) {
    return request({
        url: "/top/artists",
        params: {
            limit,
        }
    })
}


export function getHotSearch() {
    return request({
        url: "/search/hot"
    })
}