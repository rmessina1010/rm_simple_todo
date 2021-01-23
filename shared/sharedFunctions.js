export function dateString(date, pattern = '') {
    if (!date || !date.getFullYear) { return ''; }
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthAbv = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dayAbv = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrs', 'Fri', 'Sat'];
    pattern = pattern.replace('YR', date.getFullYear().toString().substr(-2));
    pattern = pattern.replace('YEAR', date.getFullYear().toString());
    pattern = pattern.replace('MONTH', monthNames[date.getMonth()]);
    pattern = pattern.replace('MO', monthAbv[date.getMonth()]);
    pattern = pattern.replace('DAY', dayNames[date.getDay()]);
    pattern = pattern.replace('DY', dayAbv[date.getDay()]);
    pattern = pattern.replace('DT', date.getDate());
    return pattern;
}
export function extactDayData(dataObj, theDate, raw = true) {
    let key = raw ? dateString(theDate, 'MO_DT_YEAR') : theDate;
    let data = dataObj[key] ? [].concat(dataObj[key].list) : [];
    data.sort((a, b) => timeSorter(a.date + ' ' + a.startTime, b.date + ' ' + b.startTime, true, ''));
    return data;
}

export function displayTime(time) {
    if (!time.getHours) { return time; }
    let hours = time.getHours();

    let minutes = time.getMinutes();
    let ampm = (hours > 11) ? ' pm' : ' am';
    if (hours == 0) { hours = 12; }
    if (hours > 12) { hours -= 12; }
    return String(hours) + ':' + String(minutes).padStart(2, '0') + ampm;
}

export function timeSorter(a, b, process = false, pre = 'Jan 1 1970 ') {
    if (process) {
        a = pre + a.replace(/ (pm|am)/i, ':00 $1');
        b = pre + b.replace(/ (pm|am)/i, ':00 $1');
    }

    return (new Date(a) > new Date(b));
}
