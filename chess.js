let moveForm   = document.getElementById("chessMoveForm")
let chessBoard = document.getElementById("chessBoard")

// use a closure to give the function a c-style static variable.
let executeMove = (function () {
	let whiteMove = true

	// this function takes a string in chess notation to execute a move.
	return function (e) {
		// we use object literals to store both the black and white unicode pieces
		const rooks   = { true: '♖', false: '♜' }
		const knights = { true: '♘', false: '♞' }
		const bishops = { true: '♗', false: '♝' }
		const queens  = { true: '♕', false: '♛' }
		const kings   = { true: '♔', false: '♚' }

		e.preventDefault()

		let moveText = document.getElementById("moveText").value

		if (typeof (moveText) !== "string" || moveText.length < 3) {
			throw Error("Expected a string of at least length 3.")
		}

		let piece

		switch (moveText.charAt(0)) {
			case 'R': piece = rooks  [whiteMove]; break
			case 'N': piece = knights[whiteMove]; break
			case 'B': piece = bishops[whiteMove]; break
			case 'Q': piece = queens [whiteMove]; break
			case 'K': piece = kings  [whiteMove]; break

			default:
				throw Error("Expected a chess piece in letter notation.")
				break
		}

		// this is where we're going to find our x, y coords
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

		let x

		switch (moveText.charAt(coordI)) {
			case 'a': x = 1; break
			case 'b': x = 2; break
			case 'c': x = 3; break
			case 'd': x = 4; break
			case 'e': x = 5; break
			case 'f': x = 6; break
			case 'g': x = 7; break
			case 'h': x = 8; break

			default:
				throw Error("Expected a lowercase letter between a-h")
				break
		}

		coordI++

		let y

		// indices are inverted because chess notation and html tables work differently
		switch (moveText.charAt(coordI)) {
			case '1': y = 8; break
			case '2': y = 7; break
			case '3': y = 6; break
			case '4': y = 5; break
			case '5': y = 4; break
			case '6': y = 3; break
			case '7': y = 2; break
			case '8': y = 1; break

			default:
				throw Error("Expected a number between 1-8")
				break
		}

		chessBoard.rows[y].cells[x].innerHTML = piece;

		// change turns
		whiteMove = !whiteMove
	}
})()

moveForm.addEventListener("submit", executeMove)
