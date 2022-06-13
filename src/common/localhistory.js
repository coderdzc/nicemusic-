export function getHistory() {
    let history = localStorage.getItem("history");
    if (history !== null) {
        return JSON.parse(history)
    } else {
        return []
    }
}

