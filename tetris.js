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
const width = board.rows[0].cells.length

// coordinates of the spaces our piece is occupying
let millisecondsPerTic = 500
let gameTicID
let gameOver = false
let level = 1

const getNewPiece = () => structuredClone(pieces[Math.floor(Math.random() * pieces.length)])

// set our starting piece
let currPiece = getNewPiece()

function gameTic() {
	// if we can't move
	if (currPiece.some((xy) => xy[1] >= height - 1 || xy[1] >= 0 && board.rows[xy[1] + 1].cells[xy[0]].classList.contains("piece"))) {
		// set the piece in place
		currPiece.forEach(function(xy) {
			if (xy[1] >= 0 && xy[1] < height) {
				board.rows[xy[1]].cells[xy[0]].classList.remove("active-piece")
				board.rows[xy[1]].cells[xy[0]].classList.add("piece")
			}
		})

		// if we're still above the top of the grid, set gameOver and return.
		if (currPiece.some((xy) => xy[1] < 0)) {
			gameOver = true
			return
		}

		// get and display a new piece
		currPiece = getNewPiece()

		currPiece.forEach(function(xy) {
			if (xy[1] >= 0) {
				board.rows[xy[1]].cells[xy[0]].classList.add("active-piece")
			}
		})

		// check for cleared lines
		return
	}

	// move each block in the piece down
	currPiece.forEach(function(xy) {
		if (xy[1] >= 0 && xy[1] < height) {
			board.rows[xy[1]].cells[xy[0]].classList.remove("active-piece")
		}

		xy[1]++
		board.rows[xy[1]].cells[xy[0]].classList.add("active-piece")
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
			if (currPiece.every((xy) => xy[0] > 0 && !board.rows[xy[1]].cells[xy[0] - 1].classList.contains("piece"))) {
				currPiece.forEach(function(xy) {
					board.rows[xy[1]].cells[xy[0]].classList.remove("active-piece")
					xy[0]--
					board.rows[xy[1]].cells[xy[0]].classList.add("active-piece")
				})
			}
			break
		case right:
			if (currPiece.every((xy) => xy[0] < width - 1 && !board.rows[xy[1]].cells[xy[0] + 1].classList.contains("piece"))) {
				// iterate twice so we don't remove already placed blocks
				currPiece.forEach((xy) => board.rows[xy[1]].cells[xy[0]].classList.remove("active-piece"))

				currPiece.forEach(function(xy) {
					xy[0]++
					board.rows[xy[1]].cells[xy[0]].classList.add("active-piece")
				})
			}
			break
		case up:
			break
		case down:
			break
	}

}

document.addEventListener("keydown", playerMovePiece)
