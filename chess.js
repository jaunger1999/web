let moveForm   = document.getElementById("chessMoveForm")
let chessBoard = document.getElementById("chessBoard")

/*
 * @param {number} x
 * @param {number} y
 * @param {string} piece
 * @param {boolean} capture
 * @returns {Array} coordinates of the piece being moved. returns [0,0] if invalid.
 */
function getOriginCoords(x, y, piece, capture) {

	return [0,0]
}

// use a closure to give the function a c-style static variable.
let executeMove = (function () {
	let whiteMove = true

	// this function takes a string in chess notation to execute a move.
	return function (e) {
		e.preventDefault()

		// we use object literals to store both the black and white unicode pieces
		const rooks   = { true: '♖', false: '♜' }
		const knights = { true: '♘', false: '♞' }
		const bishops = { true: '♗', false: '♝' }
		const queens  = { true: '♕', false: '♛' }
		const kings   = { true: '♔', false: '♚' }
		const pieces = { 'R': rooks, 'N': knights, 'B': bishops, 'Q': queens, 'K': kings, }

		const moveText = document.getElementById("moveText").value

		if (typeof(moveText) !== "string" || moveText.length < 3) {
			throw Error("Expected a string of at least length 3.")
		}

		// index the piece and then index whether it's a white or black piece
		const piece = pieces[moveText.charAt(0)][whiteMove]

		// this is the character index where we're going to find our x, y coords
		let coordI = 1

		// If taking a piece this turn (indicated by the x), our x, y coords come 1 index later.
		if (moveText.charAt(1) === 'x') {
			if (moveText.length !== 4) {
				throw Error("Expected a string of length 4 since we're capturing a piece.")
			}

			coordI++
		}
		else if (moveText.length !== 3) {
			throw Error("Expected a string of length 3 since we're not capturing a piece.")
		}

		const xValues = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, }
		const x = xValues[moveText.charAt(coordI)]

		coordI++

		const yValues = { '1': 8, '2': 7, '3': 6, '4': 5, '5': 4, '6': 3, '7': 2, '8': 1, }
		const y = yValues[moveText.charAt(coordI)]

		const originCoords = getOriginCoords(x, y, piece, capture)

		if(originCoords[0] !== 0) {
			chessBoard.rows[y].cells[x].innerHTML = piece;
			chessBoard.rows[originCoords[1]].cells[originCoords[0]] = ' '
		}

		// change turns
		whiteMove = !whiteMove
	}
})()

moveForm.addEventListener("submit", executeMove)
