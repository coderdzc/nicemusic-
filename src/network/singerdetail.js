import { request } from "./request"

export function getSingerInfoAndSong(id) {
    return request({
        url: "/artists",
        params: {
            id
        }
    })
}

export function getSingerAlbum(id, limit) {
    return request({
        url: "/artist/album",
        params: {
            id,
            limit
        }
    })
}

export function getSingerMV(id, limit) {
    return request({
        url: "/artist/mv",
        params: {
            id,
            limit
        }
    })
}

export function getSingerDesc(id) {
    return request({
        url: "/artist/desc",
        params: {
            id
        }
    })
}

export function getSingerRelate(id) {
    return request({
        url: "/simi/artist",
        params: {
            id
        }
    })
}