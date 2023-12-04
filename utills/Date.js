export const todayDate = () => {
    const today = new Date();

    const day = today.getDate();
    const mon = today.getMonth() + 1;
    const month = mon >= 10 ? mon : `0${mon}`;
    const year = today.getFullYear();

    return addLeadingZero(day) + '-' + month + '-' + year;
}

export const getPastDates = (startDate, days) => {
    const pastDates = [];
    const dateParts = startDate.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(dateParts[2], 10);

    const currentDate = new Date(year, month, day);

    for (let i = 0; i < days; i++) {
        const pastDate = new Date(currentDate.getTime());
        pastDate.setDate(currentDate.getDate() - i);
        pastDates.unshift(formatDate(pastDate));
    }

    return pastDates;
};

export const getFutureDates = (startDate, days) => {
    const futureDates = [];
    const dateParts = startDate.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(dateParts[2], 10);

    const currentDate = new Date(year, month, day);

    for (let i = 0; i < days; i++) {
        const futureDate = new Date(currentDate.getTime());
        futureDate.setDate(currentDate.getDate() + i);
        futureDates.push(formatDate(futureDate));
    }

    return futureDates;
};

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${addLeadingZero(day)}-${addLeadingZero(month)}-${year}`;
};

const addLeadingZero = (number) => {
    return number < 10 ? '0' + number : number;
};
