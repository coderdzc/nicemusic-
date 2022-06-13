import { request } from "./request";

export function getVideoDetail(id) {
    return request({
        url: "/video/detail",
        params: {
            id
        }
    })
}


export function getVideoInfo(vid) {
    return request({
        url: "/video/detail/info",
        params: {
            vid
        }
    })
}

export function getVideoUrl(id) {
    return request({
        url: "/video/url",
        params: {
            id
        }
    })
}

export function getVideoComment(id, offset) {
    return request({
        url: "/comment/video",
        params: {
            id, offset
        }
    })
}

export function getVideoRelate(id) {
    return request({
        url: "/related/allvideo",
        params: {
            id
        }
    })
}