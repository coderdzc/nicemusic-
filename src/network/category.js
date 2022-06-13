import { request } from "./request";

export function getHotSortTitle() {
    return request({
        url: "/playlist/hot"
    })
}

export function getSongSheet(cat, limit, offset) {
    return request({
        url: "/top/playlist",
        params: {
            cat,
            limit,
            offset
        }
    })
}

export function getAllSheetCategory() {
    return request({
        url: "/playlist/catlist"
    })
}