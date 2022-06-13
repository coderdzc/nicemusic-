import { request } from "./request"

export function getSortTitle() {
    return request({
        url: "/video/category/list"
    })
}


export function getAllSort() {
    return request({
        url: "/video/group/list"
    })
}

export function getAllVideo(offset) {
    return request({
        url: "/video/timeline/all",
        params: {
            offset
        }
    })
}

export function getTypeVideo(id, offset) {
    return request({
        url: "/video/group",
        params: {
            id, offset
        }
    })
}