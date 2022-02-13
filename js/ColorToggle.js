let dark = false;

function UpdateDisplay() {
    const root = document.documentElement;
    const arrows = document.querySelectorAll(".arrow");
    const button = document.querySelector(".color-toggle");

    root.style.setProperty('--background-color', dark ? "0,0,0" : "255,255,255");
    root.style.setProperty('--foreground-color', !dark ? "0,0,0" : "255,255,255");

    for (const arrow of arrows) {
        const arrowURL = "../img/" + (dark ? "White" : "Black") + "Arrow.png";
        arrow.style.backgroundImage = `url(${arrowURL})`
    }

    const buttonURL = "../img/" + (dark ? "Light" : "Dark") + "Mode.png";
    button.style.backgroundImage = `url(${buttonURL})`;

    ShowGraph(activeGraphMonthName, (dark ? "white" : "black"));
}

(function () {
    const button = document.querySelector(".color-toggle");

    UpdateDisplay();

    button.addEventListener("click", () => {
        dark = !dark;
        UpdateDisplay();
    });

})();