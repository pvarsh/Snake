let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");

// Elements to display debugging info
let snakeCoords = document.querySelector(".snakeCoords");
let snakeDir = document.querySelector(".snakeDir");
let keyDisplay = document.querySelector(".keyDisplay");

const player1Controls = {
  upKey: 38,
  downKey: 40,
  leftKey: 37,
  rightKey: 39
};

const player2Controls = {
  upKey: 87,  // W
  downKey: 83,  // S
  leftKey: 65,  // A
  rightKey: 68  // D
};

let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let snake1 = [2, 1, 0];
let snake2 = [38, 39, 40];
let direction1 = 1;
let direction2 = -1;
let score1 = 0;
let score2 = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let directionChanged = false;

document.addEventListener("DOMContentLoaded", function() {
  createBoard();
  startGame();
  playAgain.addEventListener("click", replay);
});

// Create a board with 100 div elements (for 10x10)
function createBoard() {
  popup.style.display = "none";
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);
  direction1 = 1;
  direction2 = -10;
  score1 = 0;
  score2 = 0;
  scoreDisplay.innerHTML = "Player 1: " + score1 + " - Player 2: " + score2;
  intervalTime = 1000;
  snake1 = [2, 1, 0];
  snake2 = [79, 89, 99];
  currentIndex = 0;
  snake1.forEach((index) => squares[index].classList.add("snake1"));
  snake2.forEach((index) => squares[index].classList.add("snake2"));
  interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    alert("Game Over");
    popup.style.display = "flex";
    return clearInterval(interval);
  } else {
    moveSnakes(squares);
  }
}

function moveSnakes(squares) {
  moveSnake(squares, snake1, direction1, "snake1");
  moveSnake(squares, snake2, direction2, "snake2");
}

function moveSnake(squares, snake, direction, snakeClass) {
  let tail = snake.pop();
  squares[tail].classList.remove(snakeClass);
  snake.unshift(snake[0] + direction);

  // update debugging display
  snakeCoords.textContent = "Player 1: " + snake1 + " - Player 2: " + snake2;
  snakeDir.textContent = "Player 1: " + direction1 + " - Player 2: " + direction2;

  eatApple(squares, snake, tail, snakeClass);
  squares[snake[0]].classList.add(snakeClass);
}

function checkForHits(squares) {
  if (
    (snake1[0] + width >= width * width && direction1 === width) ||
    (snake1[0] % width === width - 1 && direction1 === 1) ||
    (snake1[0] % width === 0 && direction1 === -1) ||
    (snake1[0] - width <= 0 && direction1 === -width) ||
    squares[snake1[0] + direction1].classList.contains("snake1") ||
    squares[snake1[0] + direction1].classList.contains("snake2")
  ) {
    return true;
  }

  if (
    (snake2[0] + width >= width * width && direction2 === width) ||
    (snake2[0] % width === width - 1 && direction2 === 1) ||
    (snake2[0] % width === 0 && direction2 === -1) ||
    (snake2[0] - width <= 0 && direction2 === -width) ||
    squares[snake2[0] + direction2].classList.contains("snake2") ||
    squares[snake2[0] + direction2].classList.contains("snake1")
  ) {
    return true;
  }

  return false;
}

function eatApple(squares, snake, tail, snakeClass) {
  if (squares[snake[0]].classList.contains("apple")) {
    squares[snake[0]].classList.remove("apple");
    squares[tail].classList.add(snakeClass);
    snake.push(tail);
    randomApple(squares);
    if (snakeClass === "snake1") {
      score1++;
    } else {
      score2++;
    }
    scoreDisplay.textContent = "Player 1: " + score1 + " - Player 2: " + score2;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

// Generate an apple on some grid coordinate that does not contain a snake
// Add the "apple" class to that square, CSS will take care of displaying the apple
function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (
    squares[appleIndex].classList.contains("snake1") ||
    squares[appleIndex].classList.contains("snake2")
  );
  squares[appleIndex].classList.add("apple");
}

function replay() {
  grid.innerHTML = "";
  createBoard();
  startGame();
  popup.style.display = "none";
}

document.addEventListener("keydown", function(e) {
  keyDisplay.textContent = e.keyCode;
  switch (e.keyCode) {
    case player1Controls.upKey:
      direction1 = -width;
      keyDisplay.textContent = keyDisplay.textContent + " ( ↑ )";
      break;
    case player1Controls.downKey:
      direction1 = width;
      keyDisplay.textContent = keyDisplay.textContent + " ( ↓ )";
      break;
    case player1Controls.leftKey:
      direction1 = -1;
      keyDisplay.textContent = keyDisplay.textContent + " ( ← )";
      break;
    case player1Controls.rightKey:
      direction1 = 1;
      keyDisplay.textContent = keyDisplay.textContent + " ( → )";
      break;
    case player2Controls.upKey:
      direction2 = -width;
      keyDisplay.textContent = keyDisplay.textContent + " ( ↑ )";
      break;
    case player2Controls.downKey:
      direction2 = width;
      keyDisplay.textContent = keyDisplay.textContent + " ( ↓ )";
      break;
    case player2Controls.leftKey:
      direction2 = -1;
      keyDisplay.textContent = keyDisplay.textContent + " ( ← )";
      break;
    case player2Controls.rightKey:
      direction2 = 1;
      keyDisplay.textContent = keyDisplay.textContent + " ( → )";
      break;
    default:
      console.log("Key is not supported");
  }
});
