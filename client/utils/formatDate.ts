// like format November 1, 2023
export const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}

export const convertToMonthYear = (dateString: string) => {
    const [month, year] = dateString.split("-");

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[parseInt(month, 10) - 1];

    return {
        month,
        year,
        displayMonth: `${monthName} ${year}`
    };
}