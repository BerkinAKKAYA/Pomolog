let activeGraphMonthIndex = 0;
let activeGraphMonthName = "1-2020";
let activeChart = null;

function ShowGraph(month = "1-2020") {
    activeGraphMonthName = month;

    const DrawChart = (values = []) => {
        // labels = [1,2,3,...,31]
        const labels = [...Array(31).keys()].map(x => x + 1);
        // Convert zeros into nulls
        const valuesWithNulls = values.map(x => x == 0 ? null : x)
        const color = dark ? "white" : "black";

        const data = {
            labels,
            datasets: [{
                data: valuesWithNulls,
                backgroundColor: color,
                borderColor: color,
                label: 'Day',
                fill: false,
                borderWidth: 2
            }]
        }
        const options = {
            maintainAspectRatio: false,
            elements: { line: { tension: 0.1 } },
            legend: { display: false },
            tooltips: { enabled: false },
            scales: {
                xAxes: [{ gridLines: { display: false, } }],
                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 20
                    }
                }]
            },
            animation: false
        };

        // Prevent multiple charts
        if (activeChart)
            activeChart.destroy();

        activeChart = new Chart('chart', { type: 'line', data, options });
    }

    const monthSelector = document.querySelector("#graph-tab .month-selector");
    const monthName = MonthName(month.split("-")[0]);
    const year = month.split("-")[1];

    activeGraphMonthIndex = IndexOfMonth(month);
    monthSelector.querySelector(".month-name").innerHTML = `${monthName} ${year}`;
    DrawChart(ValuesArray(data[month]));
}

// MONTH SELECTOR
(function () {
    const left = document.querySelector("#graph-tab .month-selector .left");
    const right = document.querySelector("#graph-tab .month-selector .right");

    left.addEventListener("click", () => {
        if (activeGraphMonthIndex > 0)
            ShowGraph(Object.keys(data)[activeGraphMonthIndex - 1]);

        GraphMonthSelectorButtons(activeGraphMonthIndex);
    })
    right.addEventListener("click", () => {
        const months = Object.keys(data);

        if (activeGraphMonthIndex < months.length - 1)
            ShowGraph(months[activeGraphMonthIndex + 1]);

        GraphMonthSelectorButtons(activeGraphMonthIndex);
    })
})();
