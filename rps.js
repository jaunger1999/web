const cpuChoice    = document.getElementById("cpu");
const playerChoice = document.getElementById("player");
const result       = document.getElementById("result");
const choices      = document.querySelectorAll("button");

let choice

choices.forEach(choice => choice.addEventListener("click", (e) => {
	choice                 = e.target.id;
	playerChoice.innerHTML = choice;

	cpuChoice.innerHTML = generateCPUChoice()
}))

function generateCPUChoice() {
	const randomNum = Math.floor(Math.random() * choices.length)
	console.log(randomNum)

	if(randomNum === 0) {
		return "rock";
	}
	else if(randomNum === 1) {
		return "paper";
	}
	else if(randomNum === 2) {
		return "scissors";
	}
}

function getResult() {
	if(cpuChoice === playerChoice) {
		return "it's a draw"
	}
	else if(cpuChoice === "rock" && playerChoice === "paper") {
		return "you win!"
	}
}
