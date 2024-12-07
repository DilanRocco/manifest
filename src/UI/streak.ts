export const convertHistoryToGraph = (festTimes: number[]) => {
    var now = new Date();
    const daySinceEpoch = Math.floor(now.valueOf()/8.64e7)
    const newTimes = festTimes.map(time => {  
        return daySinceEpoch - Math.floor((time/8.64e7))
    })
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
    var streak = 0
    for (let i = values.length-1; i > -1; i--) {
        if (values[i] == 0){
            break
        }
        streak += 1
    }
    return streak
}

// export function determineStreak(festTimes: number[], streak: number) {
 
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);

//     const lastFestTime = festTimes.length > 0 ? new Date(festTimes[festTimes.length-1]) : undefined
//     if (!lastFestTime) {
//       return 0
//     }
//     const isYesterdayOrToday = 
//       (lastFestTime.getFullYear() === yesterday.getFullYear() &&
//       lastFestTime.getMonth() === yesterday.getMonth() &&
//       lastFestTime.getDate() === yesterday.getDate()) ||
      
//       (lastFestTime.getFullYear() === today.getFullYear() &&
//       lastFestTime.getMonth() === today.getMonth() &&
//       lastFestTime.getDate() === today.getDate());
//     const newStreak = isYesterdayOrToday ? streak: 0
//     return newStreak
//   }