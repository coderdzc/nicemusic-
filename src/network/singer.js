import { request } from "./request"

export function getSinger(limit, type, area, initial, offset,) {
    return request({
        url: "/artist/list",
        params: {
            limit, type, area, offset, initial,
        }
    })
}