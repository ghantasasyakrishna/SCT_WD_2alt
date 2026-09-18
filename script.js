let startTime = 0;
let elapsedTime = 0;

let timerInterval = null;

let lapNumber = 0;
let previousLapTime = 0;


// HTML elements

const minutesDisplay =
    document.getElementById("minutes");

const secondsDisplay =
    document.getElementById("seconds");

const millisecondsDisplay =
    document.getElementById("milliseconds");

const startBtn =
    document.getElementById("startBtn");

const startIcon =
    document.getElementById("startIcon");

const startText =
    document.getElementById("startText");

const lapBtn =
    document.getElementById("lapBtn");

const resetBtn =
    document.getElementById("resetBtn");

const lapList =
    document.getElementById("lapList");

const lapCount =
    document.getElementById("lapCount");

const emptyState =
    document.getElementById("emptyState");

const timerState =
    document.getElementById("timerState");

const status =
    document.querySelector(".status");

const statusDot =
    document.querySelector(".status-dot");


// Format number

function formatNumber(number) {

    return number
        .toString()
        .padStart(2, "0");

}


// Update timer

function updateTimer() {

    elapsedTime =
        Date.now() - startTime;


    const minutes =
        Math.floor(elapsedTime / 60000);


    const seconds =
        Math.floor(
            (elapsedTime % 60000) / 1000
        );


    const milliseconds =
        Math.floor(
            (elapsedTime % 1000) / 10
        );


    minutesDisplay.textContent =
        formatNumber(minutes);


    secondsDisplay.textContent =
        formatNumber(seconds);


    millisecondsDisplay.textContent =
        formatNumber(milliseconds);
}


// START / PAUSE

startBtn.addEventListener("click", function () {

    // Pause

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

        startIcon.textContent = "▶";

        startText.textContent = "Resume";

        timerState.textContent = "TIMER PAUSED";

        status.innerHTML =
            '<span class="status-dot"></span> PAUSED';

        statusDot.style.background = "#f5a623";

        return;
    }


    // Start / Resume

    startTime =
        Date.now() - elapsedTime;


    timerInterval =
        setInterval(updateTimer, 10);


    startIcon.textContent = "Ⅱ";

    startText.textContent = "Pause";

    timerState.textContent = "TIMER RUNNING";

    status.innerHTML =
        '<span class="status-dot"></span> RUNNING';

    statusDot.style.background = "#ffffff";

});


// LAP

lapBtn.addEventListener("click", function () {

    // Don't create lap before timer starts

    if (elapsedTime === 0) {

        return;
    }


    lapNumber++;


    // Calculate lap difference

    const lapDifference =
        elapsedTime - previousLapTime;


    previousLapTime =
        elapsedTime;


    const lapMinutes =
        Math.floor(lapDifference / 60000);


    const lapSeconds =
        Math.floor(
            (lapDifference % 60000) / 1000
        );


    const lapMilliseconds =
        Math.floor(
            (lapDifference % 1000) / 10
        );


    const lapTime =
        formatNumber(lapMinutes) +
        ":" +
        formatNumber(lapSeconds) +
        "." +
        formatNumber(lapMilliseconds);


    // Remove empty message

    if (emptyState) {

        emptyState.remove();
    }


    // Create lap card

    const lapItem =
        document.createElement("div");


    lapItem.className =
        "lap-item";


    lapItem.innerHTML = `

        <div class="lap-number">
            LAP ${formatNumber(lapNumber)}
        </div>

        <div class="lap-time">
            ${lapTime}
        </div>

        <div class="lap-difference">
            INTERVAL
        </div>

    `;


    // Newest lap appears first

    lapList.prepend(lapItem);


    lapCount.textContent =
        lapNumber +
        (lapNumber === 1 ? " LAP" : " LAPS");

});


// RESET

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;

    elapsedTime = 0;

    lapNumber = 0;

    previousLapTime = 0;


    minutesDisplay.textContent = "00";

    secondsDisplay.textContent = "00";

    millisecondsDisplay.textContent = "00";


    startIcon.textContent = "▶";

    startText.textContent = "Start";


    timerState.textContent =
        "READY TO START";


    status.innerHTML =
        '<span class="status-dot"></span> READY';

    statusDot.style.background = "#555";


    lapCount.textContent =
        "0 LAPS";


    lapList.innerHTML = `

        <div class="empty-state" id="emptyState">

            <div class="empty-icon">◷</div>

            <p>No laps recorded</p>

            <small>
                Start the timer and press Lap
            </small>

        </div>

    `;

});