import { request } from "./request"

export function getMv(limit, area, type, order, offset) {
    return request({
        url: "/mv/all",
        params: {
            limit, area, type, order, offset
        }
    })
}