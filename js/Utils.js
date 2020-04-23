const ValuesArray = values => {
    const result = [];

    if (values == undefined)
        return

    for (const key of Object.keys(values))
    {
        result[key-1] = values[key];
    }

    return result;
}

const DayCount = (month, year) => new Date(year, month, 0).getDate();

const Months = {
    "January": "1",
    "February": "2",
    "March": "3",
    "April": "4",
    "May": "5",
    "June": "6",
    "July": "7",
    "August": "8",
    "September": "9",
    "October": "10",
    "November": "11",
    "December": "12"
}

const IndexOfMonth = month => Object.keys(data).indexOf(month);
const MonthNumber = (name) => Months[name];
const MonthName = (number) => Object.keys(Months)[parseInt(number)-1];