export function jsDateToExcelDate(jsDate: any) {
    // Calculate the number of milliseconds between the Unix epoch and the input date
    const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const unixEpoch = Date.UTC(1900, 0, 1); // January 1, 1900 in Unix timestamp
    const daysSinceEpoch = (jsDate - unixEpoch) / msPerDay;

    // Excel date format includes both days and time (fractional part)
    return daysSinceEpoch + 1; // Add 1 to account for the Excel date system's offset
}