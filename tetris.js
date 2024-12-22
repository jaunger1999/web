// different piece patterns and the starting grid coordinates of each block
// the blocks that start closer to the bottom of the board need to be at the start of the list
// this ensures blocks don't overlap when we shift the piece down
// i'm too lazy to fix the edge case that causes these problems
// i'm also gonna put the furthest left pieces to the left and furthest right pieces to the right.
const l = [[3, -1], [4, -1], [5, -1], [6, -1]]
const t = [[5, 0], [4, -1], [5, -1], [6, -1]]
const L = [[4, 0], [4, -1], [5, -1], [6, -1]]
const reverseL = [[6, 0], [4, -1], [5, -1], [6, -1]]
const square = [[4, 0], [5, 0], [4, -1], [5, -1]]
const zig = [[5, 0], [6, 0], [4, -1], [5, -1]]
const zag = [[4, 0], [5, 0], [5, -1], [6, -1]]

const pieces = [l, t, L, reverseL, square, zig, zag]

const board = document.getElementById("tetris-board")
const height = board.rows.length

// coordinates of the spaces our piece is occupying
let millisecondsPerTic = 500
let gameTicID
let gameOver = false
let level = 1

const getNewPiece = () => structuredClone(pieces[Math.floor(Math.random() * pieces.length)])

// set our starting piece
let currPiece = getNewPiece()

function gameTic() {
	const pieceCannotMove =
		currPiece.some((xy) =>
			xy[1] >= height - 1 || // we're at the bottom of the grid or
			(
				xy[1] >= 0 && board.rows[xy[1] + 1].cells[xy[0]].classList.contains("piece") && // we're above a block and
				currPiece.every((e) => e[0] !== xy[0] || e[1] !== xy[1] + 1)                    // it isn't a part of currPiece
			)
		)

	if (pieceCannotMove) {
		// if we're still above the top of the grid, set gameOver and return.
		if (currPiece.some((xy) => xy[1] < 0)) {
			gameOver = true
			return
		}

		// get and display a new piece
		currPiece = getNewPiece()

		currPiece.forEach(function(xy) {
			if (xy[1] >= 0) {
				board.rows[xy[1]].cells[xy[0]].classList.add("piece")
			}
		})

		// check for cleared lines
		return
	}

	// move each block in the piece down
	currPiece.forEach(function(xy) {
		if (xy[1] >= 0 && xy[1] < height) {
			board.rows[xy[1]].cells[xy[0]].classList.remove("piece")
		}

		xy[1]++
		board.rows[xy[1]].cells[xy[0]].classList.add("piece")
	})
}

gameTicID = setInterval(gameTic, millisecondsPerTic)

let left = "ArrowLeft"
let right = "ArrowRight"
let up = "ArrowUp"
let down = "ArrowDown"

function playerMovePiece(e) {
	switch (e.key) {
		case left:
			break
		case right:
			break
		case up:
			break
		case down:
			break
	}
}

document.addEventListener("keydown", playerMovePiece)
