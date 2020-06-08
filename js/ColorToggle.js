const DarkModeOn = () => { return document.cookie.split("=")[1] == "on"; }
const SetState = on => {
    const cookieExpireDate = "expires=Thu, 28 Dec 2020 12:00:00 UTC;";
    document.cookie = `darkMode=${on ? "on" : "off"}; ${cookieExpireDate} path=/`;
}
    
function UpdateDisplay() {
    const root = document.documentElement;
    const arrows = document.querySelectorAll(".arrow");
    const button = document.querySelector(".color-toggle");
    const dark = DarkModeOn();

    root.style.setProperty('--background-color',  dark ? "0,0,0" : "255,255,255");
    root.style.setProperty('--foreground-color', !dark ? "0,0,0" : "255,255,255");

    for (const arrow of arrows) {
        const arrowURL = "../img/" + (dark ? "White" : "Black") + "Arrow.png";
        arrow.style.backgroundImage = `url(${arrowURL})`
    }

    const buttonURL = "../img/" + (dark ? "Light" : "Dark") + "Mode.png";
    button.style.backgroundImage = `url(${buttonURL})`;

    ShowGraph(activeGraphMonthName, (dark ? "white" : "black"));
}

(function() {
    const button = document.querySelector(".color-toggle");

    if (!document.cookie) {
        SetState(false)
    }

    UpdateDisplay();

    button.addEventListener("click", () => {
        SetState(!DarkModeOn());
        UpdateDisplay();
    });

})();