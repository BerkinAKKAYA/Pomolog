function GraphMonthSelectorButtons(active)
{
    const left  = document.querySelector("#graph-tab .month-selector .left");
    const right = document.querySelector("#graph-tab .month-selector .right");
    const months = Object.keys(data);

    left.className = "left arrow";
    right.className = "right arrow";

    if (active <= 0)
    { left.className += " disabled" }

    if (active >= months.length - 1)
    { right.className += " disabled" }
}
function LogMonthSelectorButtons(active)
{
    const left  = document.querySelector("#log-tab .month-selector .left");
    const right = document.querySelector("#log-tab .month-selector .right");
    const months = Object.keys(data);

    left.className = "left arrow";
    right.className = "right arrow";

    if (active <= 0)
    { left.className += " disabled" }

    if (active >= months.length - 1)
    { right.className += " disabled" }
}