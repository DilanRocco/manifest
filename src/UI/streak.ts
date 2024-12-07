export function determineStreak(festTimes: number[], streak: number) {
 
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const lastFestTime = festTimes.length > 0 ? new Date(festTimes[festTimes.length-1]) : undefined
    if (!lastFestTime) {
      return 0
    }
    const isYesterdayOrToday = 
      (lastFestTime.getFullYear() === yesterday.getFullYear() &&
      lastFestTime.getMonth() === yesterday.getMonth() &&
      lastFestTime.getDate() === yesterday.getDate()) ||
      
      (lastFestTime.getFullYear() === today.getFullYear() &&
      lastFestTime.getMonth() === today.getMonth() &&
      lastFestTime.getDate() === today.getDate());
    const newStreak = isYesterdayOrToday ? streak: 0
    return newStreak
  }