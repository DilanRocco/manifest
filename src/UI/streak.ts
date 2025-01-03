export const convertHistoryToGraph = (festTimes: number[]) => {
    const millisecondsPerDay = 8.64e7; // Number of milliseconds in one day

    // Get the current date in local time, but ignore the time of day
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // Start of today
    
    // Calculate how many days ago each timestamp occurred
    const newTimes = festTimes.map(time => {
        const timeDate = new Date(time); // Convert timestamp to Date object
        const timeStart = new Date(timeDate.getFullYear(), timeDate.getMonth(), timeDate.getDate()).getTime(); // Start of that day
        
        const diffMilliseconds = todayStart - timeStart; // Difference in ms
        return Math.round(diffMilliseconds / millisecondsPerDay); // Convert to days
    });

    
    console.log(newTimes)
    const max = newTimes.reduce((a, b) => Math.max(a, b), -Infinity);
    let data: number[] = []
    for (let i = max; i > -1; i--) {
        if (newTimes.indexOf(i) != -1){
            (i!=max) ? data.push(data[data.length-1]+1) : data.push(1)
        } else {
            data.push(0)
        }
        
    }
    return data
}
export function determineMaxStreak(festTimes: number[]) {
    const values = convertHistoryToGraph(festTimes)
    var maxStreak = 0
    var currentStreak = 0
    if (values.length == 0) {
        return 0
    }
    for (let i = values.length-1; i > -1; i--) {
        if (values[i] == 0){
            currentStreak = 0
            continue
        }
        currentStreak += 1
        maxStreak = Math.max(maxStreak, currentStreak)
    }
    return maxStreak
}

export function determineStreak(festTimes: number[]) {
    const values = convertHistoryToGraph(festTimes)
    if (values.length == 0) {
        return 0
    }
    var streak = 0
    var start = 1
    if (values.length > 1 && values[values.length-1] == 0) {
        start = 2
    }
    for (let i = values.length-start; i > -1; i--) {
        if (values[i] == 0){
            break
        }
        streak += 1
    }
    return streak
}
