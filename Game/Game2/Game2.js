// ── State ──
let userScore = 0;
let computerScore = 0;
let drawScore = 0;

// ── DOM refs ──
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const drawScoreEl = document.getElementById("draw-score");
const userEmoji = document.getElementById("user-emoji");
const compEmoji = document.getElementById("comp-emoji");
const userDisplay = document.getElementById("user-display");
const compDisplay = document.getElementById("comp-display");
const resultMsg = document.getElementById("result-msg");
const msgText = document.getElementById("msg-text");
const resetBtn = document.getElementById("reset-btn");
const moveBtns = document.querySelectorAll(".move-btn");

// ── Emoji map ──
const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissor: "✂️",
};

const choices = ["rock", "paper", "scissor"];

// ── Determine winner ──
// Returns "user", "computer", or "draw"
function getResult(userChoice, compChoice) {
  if (userChoice === compChoice) return "draw";

  const winsAgainst = {
    rock: "scissor",  // rock beats scissors
    paper: "rock",     // paper beats rock
    scissor: "paper",    // scissors beats paper
  };

  return winsAgainst[userChoice] === compChoice ? "user" : "computer";
}

// ── Animate score bump ──
function bumpScore(el) {
  el.classList.remove("bump");
  void el.offsetWidth; // reflow to restart animation
  el.classList.add("bump");
}

// ── Play a round ──
function playGame(userChoice) {
  const compChoice = choices[Math.floor(Math.random() * 3)];
  const result = getResult(userChoice, compChoice);

  // Update display emojis
  userEmoji.textContent = emojiMap[userChoice];
  compEmoji.textContent = emojiMap[compChoice];

  // Pop animation on displays
  userEmoji.classList.remove("pop");
  compEmoji.classList.remove("pop");
  void userEmoji.offsetWidth;
  userEmoji.classList.add("pop");
  compEmoji.classList.add("pop");

  // Reset display borders
  userDisplay.className = "choice-display";
  compDisplay.className = "choice-display";
  resultMsg.className = "result-msg";

  if (result === "draw") {
    msgText.textContent = "It's a Draw! 🤝";
    resultMsg.classList.add("draw");
    userDisplay.classList.add("draw");
    compDisplay.classList.add("draw");
    drawScore++;
    drawScoreEl.textContent = drawScore;
    bumpScore(drawScoreEl);

  } else if (result === "user") {
    msgText.textContent = "You Win! 🎉";
    resultMsg.classList.add("win");
    userDisplay.classList.add("win");
    compDisplay.classList.add("lose");
    userScore++;
    userScoreEl.textContent = userScore;
    bumpScore(userScoreEl);

  } else {
    msgText.textContent = "Computer Wins! 🤖";
    resultMsg.classList.add("lose");
    userDisplay.classList.add("lose");
    compDisplay.classList.add("win");
    compDisplay.classList.add("shake");
    computerScore++;
    compScoreEl.textContent = computerScore;
    bumpScore(compScoreEl);
  }
}

// ── Button listeners ──
moveBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.getAttribute("data-choice");
    playGame(choice);
  });
});

// ── Reset ──
resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  drawScore = 0;

  userScoreEl.textContent = "0";
  compScoreEl.textContent = "0";
  drawScoreEl.textContent = "0";

  userEmoji.textContent = "❓";
  compEmoji.textContent = "❓";

  userDisplay.className = "choice-display";
  compDisplay.className = "choice-display";

  resultMsg.className = "result-msg";
  msgText.textContent = "Pick a move to start!";
});