"use strict";

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// CLASS ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

class Player {
  constructor(score, currentScore, turn) {
    this.score = score;
    this.currentScore = currentScore;
    this.turn = turn;
  }

  rollDice() {
    diceNumber = Math.trunc(Math.random() * 6 + 1);
    updateDice(diceNumber);
    if (diceNumber === 1) {
      this.score = 0;
      this.currentScore = 0;
      this.updateScorePlayer(0);
      this.updateCurrentScorePlayer(0);
    }
  }

  hold() {
    this.score += this.currentScore;
    this.currentScore = 0;
    this.updateScorePlayer(this.score);
    this.updateCurrentScorePlayer(this.currentScore);
  }

  updateCurrentScorePlayer(number) {
    this.currentScore += number;
    if (player1.turn) return displayedCurrentScorePlayer1.innerText = this.currentScore;
    if (player2.turn) return displayedCurrentScorePlayer2.innerText = this.currentScore;
  }

  updateScorePlayer(number) {
    if (this.score >= 100) return checkWinner(number);
    return checkWhichPlayerToUpdateScore(number), changeTurn();
  }

  newGame() {
    this.score = 0;
    this.currentScore = 0;
    this.turn = true;
    this.updateCurrentScorePlayer(this.currentScore);
    this.updateScorePlayer(this.score);
    this.rollDice;
    diceImage.classList.add("hidden");
    player1Square.classList.remove("player--winner");
    player2Square.classList.remove("player--winner");
    player2.turn = !player1.turn;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// DECLARATIONS ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const player1 = new Player(0, 0, true);
const player2 = new Player(0, 0, false);
let diceNumber = Math.trunc(Math.random() * 6 + 1);

const diceImage = document.querySelector(".dice");
const displayedScorePlayer1 = document.getElementById("score--0");
const displayedScorePlayer2 = document.getElementById("score--1");
const displayedCurrentScorePlayer1 = document.getElementById("current--0");
const displayedCurrentScorePlayer2 = document.getElementById("current--1");
const newGameButton = document.querySelector(".btn--new");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const player1Square = document.querySelector(".player--0");
const player2Square = document.querySelector(".player--1");
const player1Name = document.getElementById("name--0");
const player2Name = document.getElementById("name--1");

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// OUTSIDE FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const checkWinner = function() {
  if (player1.score >= 100) {
    player1Square.classList.add("player--winner");
    displayedScorePlayer1.innerText = number;
  }
  if (player2.score >= 100) {
    player2Square.classList.add("player--winner");
    displayedScorePlayer2.innerText = number;
  }
}

const checkWhichPlayerToUpdateScore = function(number) {
  if (player1.turn) {
    displayedScorePlayer1.innerText = number;
  }
  if (player2.turn) {
    displayedScorePlayer2.innerText = number;
  }
}

const updateDice = function (number) {
  diceImage.classList.remove("hidden");
  diceImage.src = `dice-${number}.png`;
};

const changingBackgroundForPlayer1 = function () {
  player1Square.classList.remove("player--active");
  player2Square.classList.add("player--active");
};

const changingBackgroundForPlayer2 = function () {
  player2Square.classList.remove("player--active");
  player1Square.classList.add("player--active");
};

const resetingPlayer1Turn = function () {
  player1.turn = false;
  player2.turn = !player1.turn;
  player1.currentScore = 0;
  player1.updateCurrentScorePlayer(player1.currentScore);
};

const resetingPlayer2Turn = function () {
  player1.turn = true;
  player2.turn = !player1.turn;
  player2.currentScore = 0;
  player2.updateCurrentScorePlayer(player2.currentScore);
};

const changeTurn = function () {
  if (player1.turn) return resetingPlayer1Turn(), changingBackgroundForPlayer1();
  return resetingPlayer2Turn(), changingBackgroundForPlayer2();
};

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// EVENTS LISTENERS /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

newGameButton.addEventListener("click", (e) => {
  player1.newGame();
  player2.newGame();
});

rollDiceButton.addEventListener("click", (e) => {
  if (player1.score >= 100 || player2.score >= 100) return;
  if (player1.turn) {
    player1.rollDice();
    if (diceNumber !== 1) player1.updateCurrentScorePlayer(diceNumber);
  } else {
    player2.rollDice();
    if (diceNumber !== 1) player2.updateCurrentScorePlayer(diceNumber);
  }
});

holdButton.addEventListener("click", (e) => {
  if (player1.turn) return player1.hold();
  return player2.hold();
});
