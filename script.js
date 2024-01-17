/*----- constants -----*/
const cellImg = {
  dog: "./images/dog.png",
  cat: "./images/cat.png",
};

const players = ["Player 1", "Player 2"];
const move = ["dog", "cat"];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

/*----- state variables -----*/
let boardState = Array(9).fill(null);
let playerIdx = 0;
let gameWinner = null;
let gameOver = false;

/*----- cached elements  -----*/
const whoseTurn = document.getElementById("player-turn");
const msgShowing = document.getElementById("game-status");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart-btn");

/*----- event listeners -----*/
cells.forEach((cell, idx) => {
  cell.addEventListener("click", () => handleCellClick(idx));
});

restartBtn.addEventListener("click", resetGame);

/*----- functions -----*/
function init() {
  boardState = Array(9).fill(null);
  playerIdx = 0;
  gameWinner = null;
  gameOver = false;
  renderGameBoard();
  updateStatusMsg();
}

function renderGameBoard() {
  boardState.forEach((cell, idx) => {
    const imgEl = cells[idx].querySelector(".cell-img");
    if (cell) {
      imgEl.src = cellImg[cell];
      imgEl.style.display = "block";
    } else {
      imgEl.style.display = "none";
    }
  });
}

function handleCellClick(idx) {
  if (gameOver || boardState[idx]) {
    return;
  }
  boardState[idx] = move[playerIdx];
  checkWinningCombi();
  // Toggle the playerIdx index to switch turns.
  playerIdx = 1 - playerIdx;
  renderGameBoard();
  // Update status msg after a move is made.
  updateStatusMsg();
}

function checkWinningCombi() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      gameWinner = players[playerIdx];
      gameOver = true;
      return;
    }
  }
  if (!boardState.includes(null) && !gameWinner) {
    gameWinner = "Draw";
    gameOver = true;
  }
  updateStatusMsg();
}

function resetGame() {
  init();
}

function updateStatusMsg() {
  if (gameOver) {
    // Update the message for different conditions.
    if (gameWinner === "Draw") {
      msgShowing.textContent = "Game Status: It's a draw!";
    } else {
      const winMessage = gameWinner === players[0] ? "Woof!" : "Meow!";
      msgShowing.textContent = `Game Status: ${winMessage}`;
    }
    whoseTurn.textContent = "";
  } else {
    // Update the message for the current player's turn.
    whoseTurn.textContent = `${players[playerIdx]}, you may click on any empty boxes below.`;
    msgShowing.textContent = "Game Status: Ongoing ...";
  }
}

init();
