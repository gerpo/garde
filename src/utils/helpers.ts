
export function formatDate(date: Date, onlyDate: boolean = false, onlyTime: boolean = false) {
    const dateFormat = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' }
    const timeFormat = { hour: '2-digit', minute: '2-digit' }
    let format = {}
    if (!onlyDate) format = { ...timeFormat, ...format };
    if (!onlyTime) format = { ...dateFormat, ...format };

    return date.toLocaleString(navigator.language, format);
}

export function createMonthString(key: string) {
    const [year, month] = key.split('.');
    const date = new Date();
    date.setDate(1)
    date.setMonth(parseInt(month))
    date.setFullYear(parseInt(year));

    return date.toLocaleString(navigator.language, {month: 'long', year: 'numeric'})
}

type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];
export const groupByMonth = <T extends {}, K extends KeysOfType<T, Date>>(array: T[], key: K) => {
    // Return the reduced array
    return array.reduce((result, currentItem) => {
        const dateKey = `${currentItem[key].getFullYear()}.${currentItem[key].getMonth()}`;
        // If an array already present for key, push it to the array. Otherwise create an array and push the object.
        (result[dateKey] = result[dateKey] || []).push(currentItem);
        // return the current iteration `result` value, this will be the next iteration's `result` value and accumulate
        return result;
    }, {} as {[key: string]: T[]}); // Empty object is the initial value for result object
};