let activeLogMonthIndex = 0;

function ShowLogs(month="1-2020")
{
    const CreateLog = (dateSTR="", pomodoroCount=0) => {
    
        const element   = document.createElement("div");
        const date      = document.createElement("div");
        const semicolon = document.createElement("div");
        const pomodoros = document.createElement("div");

        const dateSTRmonth = dateSTR.split(" ")[0]
        const dateSTRday = dateSTR.split(" ")[1];
        const whitespace = dateSTRday.toString().length == 1 ? " " : " ";
        const displayDate = dateSTRmonth + whitespace + `${parseInt(dateSTRday) + 1}`

        element.className   = "log";
        date.innerHTML      = displayDate;
        semicolon.innerHTML = ":";
        pomodoros.innerHTML = pomodoroCount + " pomodoros";

        // Make red if no pomodoros
        if (pomodoroCount == 0)
            element.style.color = "#aa0000";
        else
            element.style.color = "unset";

        // ON CLICK
        element.addEventListener("click", () => {
            const newValue = parseInt(prompt("New Pomodoro Count", 0));

            if (newValue <= 20 && newValue >= 0)
            {
                const whitespace = (newValue.toString().length == 1 ? " " : "");
                pomodoros.innerHTML = whitespace + newValue + " pomodoros";

                if (newValue == 0)
                    element.style.color = "#990000";
                else
                    element.style.color = "unset";
                
                const day = parseInt(dateSTR.split(" ").slice(-1)[0]) + 1;
                EditData(month, day, newValue);
            }
        })
    
        element.appendChild(date);
        element.appendChild(semicolon);
        element.appendChild(pomodoros);
    
        return element;
    }
    const CreateTotalValue = (value) => {
        const element   = document.createElement("div");
        const totalText = document.createElement("div");
        const semicolon = document.createElement("div");
        const pomodoros = document.createElement("div");

        element.className = "log total";
        totalText.innerHTML = "TOTAL";
        semicolon.innerHTML = ":";
        pomodoros.innerHTML = value + " pomodoros";

        element.appendChild(totalText);
        element.appendChild(semicolon);
        element.appendChild(pomodoros);
    
        return element;
    }
    const PopulateLogs = (monthName="", logs=[]) => {
        const container = document.querySelector(".logs");
        ClearLogTable();
    
        for (const log in logs)
        {
            if (isNaN(log))
                continue;

            const day = parseInt(log);
            const whitespace = (logs[log].toString().length == 1 ? " " : "");
            const pomodoroCount = whitespace + (logs[log] === undefined ? 0 : logs[log]);
            const element = CreateLog(`${monthName} ${day}`, pomodoroCount);
            container.appendChild(element);
        }

        if (logs)
        {
            const totalValue = Object.values(logs).reduce((x,y) => x+y, 0);
            container.appendChild(CreateTotalValue(totalValue));
        }
    }

    const monthSelector = document.querySelector("#log-tab .month-selector");
    const monthName = MonthName(month.split("-")[0]);
    const year = month.split("-")[1];

    activeLogMonthIndex = IndexOfMonth(month);
    monthSelector.querySelector(".month-name").innerHTML = `${monthName} ${year}`;
    PopulateLogs(`${monthName}`, ValuesArray(data[month]));
}

function ClearLogTable()
{
    const container = document.querySelector(".logs");

    while (container.firstElementChild)
        container.removeChild(container.firstElementChild);
}

// MONTH SELECTOR
(function () {
    const left  = document.querySelector("#log-tab .month-selector .left");
    const right = document.querySelector("#log-tab .month-selector .right");

    left.addEventListener("click", () => {
        if (activeLogMonthIndex > 0)
            ShowLogs(Object.keys(data)[activeLogMonthIndex-1]);

        LogMonthSelectorButtons(activeLogMonthIndex);
    })
    right.addEventListener("click", () => {
        const months = Object.keys(data);

        if (activeLogMonthIndex < months.length - 1)
            ShowLogs(months[activeLogMonthIndex+1]);
        
        LogMonthSelectorButtons(activeLogMonthIndex);
    })
})();

// ADD MONTH & REMOVE MONTH
(function () {
    const addMonthButton = document.querySelector("#log-tab .add-month .button");
    const removeMonthButton = document.querySelector("#log-tab .remove-month");

    addMonthButton.addEventListener("click", () => {
        let monthInput = document.querySelector("#log-tab .add-month input").value;
        monthInput = monthInput.split("-").reverse();
        monthInput[0] = parseInt(monthInput[0]);
        AddMonth(monthInput[0], monthInput[1]);
    });

    removeMonthButton.addEventListener("click", () => {

        const keys = Object.keys(data);

        if (keys.length == 0)
            return;

        if (keys[activeLogMonthIndex])
        {
            const toDelete = keys[activeLogMonthIndex].split("-");
            RemoveMonth(toDelete[0], toDelete[1]);
        }
        else
        {
            console.log("Month doesn't exists.");
        }
    });

})()