const grid = document.querySelector(".grid_si")
const width = 15
const result_d = document.querySelector(".result")

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    grid.appendChild(square)
}

let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]
const squares = Array.from(document.querySelectorAll(".grid_si div"))

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.add("invader")
    }
}

draw()
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader")
    }
}

let shooterI = 200
squares[shooterI].classList.add("shooter")

function moveShooter(e) {
    squares[shooterI].classList.remove("shooter")

    switch (e.key) {
        case "ArrowLeft":
            if (shooterI % width !== 0)
                shooterI -= 1;
            break
        case "ArrowRight":
            if (shooterI % width < width - 1)
                shooterI += 1;
            break
        case "ArrowUp":
            if (shooterI >= width)
                shooterI -= width
            break
        case "ArrowDown":
            if (shooterI / width < width - 1)
                shooterI += width
            break
    }

    squares[shooterI].classList.add("shooter")
}

document.addEventListener("keydown", moveShooter)

let invadersID
let direction = 1

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if ((leftEdge && (direction === -1)) || (rightEdge && (direction === 1))) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width
        }

        direction *= -1
    }
    else {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
        }
    }

    let oob = false

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length)) {
            result_d.innerHTML = "GAME OBER"
            clearInterval(invadersID)
            oob = true
        }
    }

    if (!oob) {
        draw()
    }

    if (squares[shooterI].classList.contains("invader", "shooter")) {
        result_d.innerHTML = "GAME OBER"
        clearInterval(invadersID)
    }

}

invadersID = setInterval(moveInvaders, 500)

function shoot(e) {
    let laserID
    let laserI = shooterI

    function moveLaser() {
        squares[laserI].classList.remove("laser")
        laserI -= width

        if (laserI < 0) {
            clearInterval(laserID)
            return
        }

        squares[laserI].classList.add("laser")
        if (squares[laserI].classList.contains("invader")) {
            squares[laserI].classList.remove("laser")
            squares[laserI].classList.remove("invader")
            squares[laserI].classList.add("boom")

            setTimeout(() => squares[laserI].classList.remove("boom"), 300)
            clearInterval(laserID)

            alienInvaders.splice(alienInvaders.indexOf(laserI), 1)

            if (alienInvaders.length === 0) {
                result_d.innerHTML = "U R WINRAR"
                clearInterval(invadersID)
            }
        }
    }

    switch (e.key) {
        case " ":
            laserID = setInterval(moveLaser, 100)
            break
    }
}

document.addEventListener("keydown", shoot)
