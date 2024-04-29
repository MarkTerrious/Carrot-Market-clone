export function formatToTimeAgo(date: string)
{
    const dayInMs = 1000 * 60 * 60 * 24;
    const picDate = new Date(date).getTime();  // date of the things created 
    const curDate = new Date().getTime();      // current date

    // calcualtion using [반올림] 
    const diff = Math.round((picDate - curDate) / dayInMs);
    // Format for International Time zone
    const formatter = new Intl.RelativeTimeFormat("ko");    
    // make it through the format
    return formatter.format(diff, "days"); 
}

export function formatToWon(price: number) 
{
    // 원화, 달러 등등...
    return price.toLocaleString("ko-KR");
}