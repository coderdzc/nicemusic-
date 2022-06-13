import { request } from "./request";

export function getMvDetail(mvid) {
    return request({
        url: "/mv/detail",
        params: {
            mvid
        }
    })
}


export function getMvInfo(mvid) {
    return request({
        url: "/mv/detail/info",
        params: {
            mvid
        }
    })
}

export function getMvUrl(id) {
    return request({
        url: "/mv/url",
        params: {
            id
        }
    })
}

export function getMvComment(id, offset) {
    return request({
        url: "/comment/mv",
        params: {
            id, offset
        }
    })
}

export function getMvRelate(mvid) {
    return request({
        url: "/simi/mv",
        params: {
            mvid
        }
    })
}

export function setCommentLike(id, cid, t, type, timestamp) {
    return request({
        url: "/comment/like",
        params: {
            id, cid, t, type, timestamp
        }
    })
}