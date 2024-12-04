const timeLeft_d  = document.querySelector("#time_left")
const result_d    = document.querySelector("#result")
const startButton = document.querySelector("#start_button")
const squares     = document.querySelectorAll(".grid div")
const width = 9;

const logs_left = document.querySelectorAll(".log_left")
const logs_right = document.querySelectorAll(".log_right")
const cars_left = document.querySelectorAll(".car_left")
const cars_right = document.querySelectorAll(".car_right")

let currI = 76;
let currTime = 20
let timerID
let outcomeTimerID

function MoveFrog(e) {
    squares[currI].classList.remove("frog");

    switch (e.key) {
        case "ArrowLeft":
            if(currI % width !== 0)
                currI -= 1;
            break;
        case "ArrowRight":
            if(currI % width < width - 1)
                currI += 1;
            break;
        case "ArrowUp":
            if(currI >= width)
                currI -= width
            break;
        case "ArrowDown":
            if(currI / width < width - 1)
                currI += width
            break;
    }

    squares[currI].classList.add("frog");
}

function AutoMoveLogs() {
    currTime--
    timeLeft_d.textContent = currTime
    logs_left.forEach(logLeft => MoveLogLeft(logLeft))
    logs_right.forEach(logRight => MoveLogRight(logRight))
    cars_left.forEach(carLeft => MoveCarLeft(carLeft))
    cars_right.forEach(carRight => MoveCarRight(carRight))
}

function checkOutComes() {
    Lose()
    Win()
}

function MoveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function MoveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function MoveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function MoveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function Lose() {
    if (
        squares[currI].classList.contains('c1') ||
        squares[currI].classList.contains('l4') ||
        squares[currI].classList.contains('l5') ||
        currTime <= 0

    ) {
        result_d.textContent = 'You lose!'
        clearInterval(timerID)
        clearInterval(outcomeTimerID)
        squares[currI].classList.remove('frog')
        document.removeEventListener('keyup', MoveFrog)
    }
}

function Win() {
    if (squares[currI].classList.contains('ending_block')) {
        result_d.textContent = 'You Win!'
        clearInterval(timerID)
        clearInterval(outcomeTimerID)
        document.removeEventListener('keyup', MoveFrog)
    }
}

startButton.addEventListener('click', () => {
    if (timerID) {
        clearInterval(timerID)
        clearInterval(outcomeTimerID)
        outcomeTimerID = null
        timerID = null
        document.removeEventListener('keyup', MoveFrog)
    }
    else {
        timerID = setInterval(AutoMoveLogs, 1000)
        outcomeTimerID = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', MoveFrog)
    }
})