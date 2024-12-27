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

// update display unc
function updateTimeDisplay() {
    let hours = String(Math.floor(timeRemaining / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, '0');
    let seconds = String(timeRemaining % 60).padStart(2, '0');
    if (timeRemaining === 0) {
        hours = String(0).padStart(2, '0');
        minutes = String(0).padStart(2, '0');
        seconds = String(0).padStart(2, '0');
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`
        return;
    }
    if (timeRemaining < 60) {
        seconds = String(timeRemaining).padStart(2, '0');
    }
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`
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
            }
            checkTimer();
        }, 1000);
    }
});

// function to check if timer is at 0
function checkTimer() {
    if (timeRemaining === 0 && !alertShown) {
        isRunning = false;
        timerInterval = null;
        pauseBtn.classList.add('hidden')
        resetBtn.classList.add('hidden')
        startBtn.classList.remove('hidden');
        alertShown = true;
        setTimeout(() => {
            alert('time is up!')
        }, 100);
        clearInterval(timerInterval)
    }
}

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
            timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimeDisplay();
        }, 1000);  
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            pauseBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
            resetBtn.classList.remove('hidden');
        }
    }
});

// pause button handler
resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = 2;
    updateTimeDisplay();
    pauseBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
});