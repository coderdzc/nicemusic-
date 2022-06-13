import { request } from "./request";

export function getSearch(keywords, type) {
    return request({
        url: "/cloudsearch",
        params: {
            type,
            keywords
        }
    })
}