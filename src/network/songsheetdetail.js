import { request } from "./request";

export function getSongSheetInfo(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id,
        }

    })
}

export function getSongSheetSong(id) {
    return request({
        url: "/playlist/track/all",
        params: {
            id,
        }
    })
}

export function getSongSheetPerson(id, limit) {
    return request({
        url: "/playlist/subscribers",
        params: {
            id,
            limit
        }
    })
}

export function getSongSheetRelate(id) {
    return request({
        url: "/related/playlist",
        params: {
            id,
        }
    })
}

export function getSongSheetComment(id, type) {
    return request({
        url: "/comment/new",
        params: {
            id,
            type
        }
    })
}

export class songSheetInfo {
    constructor(playlist, creator) {
        this.coverImg = playlist.coverImgUrl;
        this.title = playlist.name;
        this.tag = playlist.tags;
        this.desc = playlist.description;
        this.cavatar = creator.avatarUrl;
        this.cname = creator.nickname;
        this.ctime = playlist.createTime;

    }
}
