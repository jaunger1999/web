// different piece patterns and their starting positions
const l = [[3, -1], [4, -1], [5, -1], [6, -1],]
const t = [[4, -1], [5, -1], [5, 0], [6, -1],]
const L = [[4, 0], [4, -1], [5, -1], [6, -1],]
const reverseL = [[4, -1], [5, -1], [6, -1], [6, 0],]
const square = [[4, -1], [4, 0], [5, -1], [5, 0],]
const zig = [[4, -1], [5, -1], [5, 0], [6, 0],]
const zag = [[4, 0], [5, 0], [5, -1], [6, -1],]

const pieces = [
	l, t, L, reverseL, square, zig, zag,
]

const board = document.getElementById("board")
const height = board.rows.Length

// coordinates of the spaces our piece is occupying
let currPiece = [[0, 0], [0, 0], [0, 0], [0, 0],]
let millisecondsPerTic = 500
let gameTicID
let gameOver = false
let level = 1

function movePieceDown() {
	// if there's a piece below our current piece... 
	if (currPiece.some((xy) => board.rows[xy[1]].cells[xy[0] + 1].classList.contains("piece"))) {
		// ...and we're still above the top of the grid, set gameOver and return.
		if (currPiece.some((xy) => xy[1] < 0)) {
			gameOver = true
			return
		}

		// set a new piece
		currPiece = pieces[Math.floor(Math.random(pieces.length))]

		// check for cleared lines
		return
	}

	currPiece.forEach((xy) => xy[1]++)
}

gameTicID = setInterval(movePieceDown, millisecondsPerTic)
