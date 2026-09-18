let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

let lapNumber = 0;
let lastLapTime = 0;


// Get HTML elements

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");


// Format numbers

function formatTime(number) {
    return number.toString().padStart(2, "0");
}


// Update stopwatch display

function updateDisplay() {

    let time = elapsedTime;

    let hrs = Math.floor(time / 3600000);

    let mins = Math.floor((time % 3600000) / 60000);

    let secs = Math.floor((time % 60000) / 1000);

    let ms = Math.floor((time % 1000) / 10);


    hours.textContent = formatTime(hrs);

    minutes.textContent = formatTime(mins);

    seconds.textContent = formatTime(secs);

    milliseconds.textContent = formatTime(ms);
}


// Start stopwatch

startBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(function () {

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    }, 10);
});


// Pause stopwatch

pauseBtn.addEventListener("click", function () {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
});


// Record lap

lapBtn.addEventListener("click", function () {

    if (elapsedTime === 0) {
        return;
    }

    lapNumber++;

    let currentLapTime = elapsedTime - lastLapTime;

    lastLapTime = elapsedTime;


    let lapHours = Math.floor(currentLapTime / 3600000);

    let lapMinutes = Math.floor((currentLapTime % 3600000) / 60000);

    let lapSeconds = Math.floor((currentLapTime % 60000) / 1000);

    let lapMilliseconds = Math.floor((currentLapTime % 1000) / 10);


    let lapTime =
        formatTime(lapHours) + ":" +
        formatTime(lapMinutes) + ":" +
        formatTime(lapSeconds) + "." +
        formatTime(lapMilliseconds);


    let li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${lapTime}</span>
    `;


    lapList.prepend(li);
});


// Reset stopwatch

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    elapsedTime = 0;

    startTime = 0;

    lapNumber = 0;

    lastLapTime = 0;

    lapList.innerHTML = "";

    updateDisplay();
});


// Initial display

updateDisplay();