const ALARM = new Audio('AlarmSound.mp3');
const POMODORO_SECONDS = 60 * 25;
let remainingSeconds = POMODORO_SECONDS;
let clockRunning = false;
let clockInterval = null;
let clockStartedAt = 0;
let clockElapsed = 0;

(function () {
    const overtimeIndicator = document.getElementById("overtime");
    const remainingText = document.getElementById("remaining");
    const percentText = document.getElementById("percent");
    const toggleButton = document.querySelector("#clock-tab .controls div:nth-child(1)");
    const resetButton = document.querySelector("#clock-tab .controls div:nth-child(2)");

    const SecondsToText = seconds => {

        let result = "";

        // NEGATIVE OR NOT
        if (seconds < 0) { result = "-" }
        seconds = Math.abs(seconds);

        const minuteDisplay = parseInt(seconds / 60);
        const secondDisplay = seconds%60 <= 9 ? ("0" + seconds%60) : seconds%60;

        result += `${minuteDisplay}:${secondDisplay}`;
        return result;
    }

    const UpdateDisplay = () => {
        if (clockRunning)
            remainingSeconds = POMODORO_SECONDS - (clockElapsed + parseInt((Date.now() - clockStartedAt) / 1000));

        overtimeIndicator.className = remainingSeconds < 0 ? "" : "hide";
        remainingText.innerHTML = SecondsToText(remainingSeconds);

        const percentNumber = parseInt((remainingSeconds / POMODORO_SECONDS) * 100);
        const percentDisplay = percentNumber >= 0 ? percentNumber : "+" + Math.abs(percentNumber);
        percentText.innerHTML = percentDisplay + "%";

        document.title = clockRunning ? SecondsToText(remainingSeconds) : "Pomolog";

        if (remainingSeconds == 0) {
            ALARM.play();
        }
    }

    UpdateDisplay();

    toggleButton.addEventListener("click", () => {
        clockRunning = !clockRunning;
        toggleButton.className = "button " + (clockRunning ? "stop" : "start");
        toggleButton.innerHTML = (clockRunning ? "STOP" : "START");

        if (clockRunning)
        {
            clockStartedAt = Date.now();
            clockInterval = setInterval(UpdateDisplay, 500);
        }
        else
        {
            clearInterval(clockInterval);
            clockElapsed += parseInt((Date.now() - clockStartedAt) / 1000);
        }

        UpdateDisplay();
    })
    
    resetButton.addEventListener("click", () => {
        clockRunning = false;
        remainingSeconds = POMODORO_SECONDS;
        clearInterval(clockInterval);
        clockElapsed = 0;
        
        toggleButton.className = "button start";
        toggleButton.innerHTML = "START";
        
        UpdateDisplay();
    });

})();