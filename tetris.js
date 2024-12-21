// different piece patterns
const l = [
	[ true,	true,	true,	true, ],
	[ false, false, false, false, ],
]

const t = [
	[ false,	true,	true,	true, ],
	[ false, false, true, false, ],
]

const L = [
	[ false,	true,	true,	true, ],
	[ false, true, false, false, ],
]

const reverseL = [
	[ false,	true,	true,	true, ],
	[ false, false, false, true, ],
]

const square = [
	[ false,	true,	true,	false, ],
	[ false, true, true, false, ],
]

const zig = [
	[ false,	true,	true,	true, ],
	[ true, true, false, false, ],
]

const zag = [
	[ true,	true,	true,	false, ],
	[ false, true, false, true, ],
]

const pieces = [
	l, t, L, reverseL, square, zig, zag,
]

let currPiece = new Array(4);
let millisecondsPerTic = 500
let gameTicID

function movePieceDown() {

}

gameTicID = setInterval(movePieceDown, millisecondsPerTic)
