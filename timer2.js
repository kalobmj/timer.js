// referecnes to DOM elems
const timerDisplay = document.getElementById('timer');
const plusFiveBtn = document.getElementById('five-btn');
const plusFifteenBtn = document.getElementById('fifteen-btn');
const plusHourBtn = document.getElementById('hour-btn');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// variables
let isRunning = false;
let timeRemaining = 0;
let timerInterval = null;
let alertShown = false;

function updateTimeDisplay() {
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    let hours = String(Math.floor(timeRemaining / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, '0');
    let seconds = String(timeRemaining % 60).padStart(2, '0');
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`
};

// function to check if timer is at 0
function checkTimer() {
    if (timeRemaining === 0 && !alertShown) {
        isRunning = false;
        pauseBtn.classList.add('hidden')
        resetBtn.classList.add('hidden')
        startBtn.classList.remove('hidden');
        alertShown = true;
        clearInterval(timerInterval);
        timerInterval = null;
        setTimeout(() => {
            alert('time is up!')
        }, 100);
    }
};

// five button handler
plusFiveBtn.addEventListener('click', () => {
    timeRemaining += 300;
    updateTimeDisplay();
});

// fifteen button handler
plusFifteenBtn.addEventListener('click', () => {
    timeRemaining += 900;
    updateTimeDisplay();
});

// hour button handler
plusHourBtn.addEventListener('click', () => {
    timeRemaining += 3600;
    updateTimeDisplay();
});

// start button handler
startBtn.addEventListener('click', () => {

    if (!isRunning && timeRemaining > 0) {
        isRunning = true;
        alertShown = false;
        startBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimeDisplay();
                console.log({timerInterval})
            } else {
                timeRemaining = 0;
                checkTimer();
                console.log(timerInterval)
            }
        }, 1000);
    }
});

// pause button handler
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
        updateTimeDisplay();
        pauseBtn.style.backgroundColor = '#bd4637'
    } else {
        pauseBtn.style.backgroundColor = '#cfccbb'
        if (timeRemaining > 0) {
            isRunning = true;
            timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimeDisplay();
            console.log({timerInterval})
        }, 1000);  
        }
    }
});

// reset button handler
resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = 0;
    pauseBtn.style.backgroundColor = '#cfccbb'
    updateTimeDisplay();
    pauseBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
});