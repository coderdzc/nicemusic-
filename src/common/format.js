import { formatDate } from "./dateFomat"

export const format = {
    complex(artist, indey, length) {
        if (length > 1) {
            if (indey + 1 === length) {
                return artist;
            } else {
                return artist + " /";
            }
        } else {
            return artist;
        }
    },
    formatTime(time) {
        let dateTime = new Date(time);
        let min = dateTime.getMinutes();
        min = min < 10 ? "0" + min : min;
        let sec = dateTime.getSeconds();
        sec = sec < 10 ? "0" + sec : sec;
        return `${min}:${sec}`;
    },
    formatNum(index) {
        if (index < 10) {
            return `0${index}`;
        } else {
            return index;
        }
    },
    filterformatDate(date) {
        const time = new Date(date);
        return formatDate(time, "yyyy-MM-dd") + "创建"
    },
    playCount(num) {
        let Intnum = 0;
        if (num < 10000) {
            return num;
        } else if (num > 10000 && num < 100000000) {
            Intnum = parseInt(num / 10000);
            return Intnum + "万";
        } else {
            Intnum = parseInt(num / 100000000);
            return Intnum + "亿";
        }
    },
    setTime(time) {
        let min = parseInt(time / 60)
        min = min < 10 ? "0" + min : min
        let sec = parseInt(time % 60)
        sec = sec < 10 ? "0" + sec : sec
        return `${min}:${sec}`
    },
    birth(time) {
        let data = new Date(time);
        let year = data.getFullYear();
        year = year.toString().slice(2)
        let month = data.getMonth() + 1;
        let day = data.getDate()
        let star = ""
        if ((month == 3 && day >= 21 && day <= 31) || (month == 4 && day >= 1 && day <= 19)) {
            star = "白羊座"
        } else if ((month == 4 && day >= 20 && day <= 30) || (month == 5 && day >= 1 && day <= 20)) {
            star = "金牛座"
        } else if ((month == 5 && day >= 21 && day <= 31) || (month == 6 && day >= 1 && day <= 21)) {
            star = "双子座"
        } else if ((month == 6 && day >= 22 && day <= 30) || (month == 7 && day >= 1 && day <= 22)) {
            star = "巨蟹座"
        } else if ((month == 7 && day >= 23 && day <= 31) || (month == 8 && day >= 1 && day <= 22)) {
            star = "狮子座"
        } else if ((month == 8 && day >= 23 && day <= 31) || (month == 9 && day >= 1 && day <= 22)) {
            star = "处女座"
        } else if ((month == 9 && day >= 23 && day <= 30) || (month == 10 && day >= 1 && day <= 23)) {
            star = "天蝎座"
        } else if ((month == 10 && day >= 24 && day <= 31) || (month == 11 && day >= 1 && day <= 22)) {
            star = "天秤座"
        } else if ((month == 11 && day >= 24 && day <= 30) || (month == 12 && day >= 1 && day <= 21)) {
            star = "射手座"
        } else if ((month == 12 && day >= 22 && day <= 31) || (month == 1 && day >= 1 && day <= 19)) {
            star = "魔羯座"
        } else if ((month == 1 && day >= 20 && day <= 31) || (month == 2 && day >= 1 && day <= 18)) {
            star = "水瓶座"
        } else if ((month == 2 && day >= 19 && day <= 28) || (month == 3 && day >= 1 && day <= 20)) {
            star = "双鱼座"
        }
        return `${year}后-${star}`
    }
}

