const options = ["Rock", "Paper", "Scissors"];
let attempts = 3;
let score = 0;
let history = [];
let isGameStarted = false;

const resultMessages = {
	tie: "It's a tie!",
	win: "You win!",
	loss: "Computer wins!",
};

const btnContainer = document.getElementById("btn_container");
const attemptsEl = document.getElementById("attempts");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const historyEl = document.getElementById("history");
const toggleDescription = document.getElementById("toggleDescription");
const gameDescription = document.getElementById("gameDescription");
const playBtn = document.getElementById("playBtn");
const results = document.getElementById("results");

// Toggle Game Rules
toggleDescription.addEventListener("click", () => {
	const hidden = gameDescription.classList.toggle("hidden");
	toggleDescription.textContent = hidden ? "+" : "-";
});

// Create Buttons
options.forEach(option => {
	const btn = document.createElement("button");
	const img = document.createElement("img");
	img.src = `./images/${option}.svg`;
	img.alt = option;
	btn.appendChild(img);

	btn.addEventListener("click", () => handleUserChoice(option));
	btnContainer.appendChild(btn);
});

// Start Game
playBtn.addEventListener("click", () => {
	if (!isGameStarted) {
		//start Game
		btnContainer.classList.remove("hidden");
		results.classList.remove("hidden");
		playBtn.textContent = "Restart Game"
		isGameStarted = true
	} else {
		// Reset Game
		attempts = 3;
		score = 0;
		history = [];

		attemptsEl.textContent = attempts;
		scoreEl.textContent = score;
		historyEl.textContent = "";

		btnContainer.classList.remove("hidden");
	}
	setMessage();
});

// Generate Computer Choice
function getComputerChoice() {
	return options[Math.floor(Math.random() * options.length)];
}

// Determine Outcome
function getOutcome(user, computer) {
	if (user === computer) return "tie";

	const wins = {
		Paper: "Rock",
		Rock: "Scissors",
		Scissors: "Paper",
	};

	return wins[user] === computer ? "win" : "loss";
}

// Handle User Choice
function handleUserChoice(userChoice) {
	if (attempts === 0) return;

	const computerChoice = getComputerChoice()
	const outcome = getOutcome(userChoice, computerChoice);

	attempts--;
	if (outcome === "win") score++;
	if (outcome === "loss") score--;

	history.push(`You: ${userChoice}, Computer: ${computerChoice} → ${resultMessages[outcome]}`);

	updateDisplay(outcome);

	if (attempts === 0) endGame();
}

// Update UI
function updateDisplay(outcome) {
	attemptsEl.textContent = attempts;
	scoreEl.textContent = score;
	historyEl.textContent = history.join(" | ");

	setMessage(resultMessages[outcome], outcome);
}

// End Game
function endGame() {
	btnContainer.classList.add("hidden");

	const finalOutcome = score === 0 ? "tie" : score > 0 ? "win" : "loss";
	setMessage(resultMessages[finalOutcome], finalOutcome);
}

// Message Helper
function setMessage(msg = 'Play!', outcome = "") {
	messageEl.textContent = msg;
	messageEl.className = "";
	if (outcome) messageEl.classList.add(outcome);
}