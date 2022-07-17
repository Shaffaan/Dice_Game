'use strict';

//score0ELE and score2ELE are the element not the score
// to get score get use the Use text

const score0ELE = document.querySelector('#score--0');
const score1ELE = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const curr0EL = document.querySelector('#current--0');
const curr1EL = document.querySelector('#current--1');

const btnOpenIns = document.querySelector('.btn--instructions');
const btnCloseIns = document.querySelector('.close-modal');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  //starting phase
  diceEl.classList.add('hidden'); // to add a class just add the hidden do not use a fullstop
  //to hide an element create a hidden element in css, then add whatever you want to hide to that component

  //cant use this code as we change active player back to 0
  /*
  if (activePlayer == 0) {
    player0EL.classList.remove('player--winner');
  } else {
    player1EL.classList.remove('player--winner');
  }
  // we have active player later otherwise it can never remove class from player 1
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  */
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  //change player 0 scores back to 0
  document.querySelector('#current--0').textContent = 0;
  curr0EL.textContent = 0;
  score0ELE.textContent = 0;
  //change player 1 scores back to 0
  curr1EL.textContent = 0;
  score1ELE.textContent = 0;
  //change the playing state back to playing
};
init();

function switchPlayer() {
  //change that elements current score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //change current score itself to zero
  currentScore = 0;
  // if active player === 0 change it to 1 and if active player doesnt equal 0 change it to 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle is the perfect solution , it checks if that class is there and if it is it will remove it, if it isnt then it will add it
  // when we start the game, it is already present on player0
  // so we remove it from player 0 and add it to player 1
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
}

//first time when user clicks the roll dice button
//Clicking the roll dice button
btnRoll.addEventListener('click', function () {
  if (playing) {
    //first part is to generate a number
    const dice = Math.floor(Math.random() * 6 + 1);

    //second part is to add display the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //third step is to check if it is 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //add dice score to the current score
    } else {
      switchPlayer();
    }
  }
});

//clicking the hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score is alreayd a 100 {if it is player wins}
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`) //for query selector we have to use .
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      //no need to switch player if game ends
      // it will be switched when we restart
      return;
    }
    // switch player and change the bottom displayed score to zero
    switchPlayer();
  }
});

// last part of the code is the newgame button
btnNew.addEventListener('click', init);

btnOpenIns.addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('hidden');
});

btnCloseIns.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (
    e.key === 'Escape' &&
    !document.querySelector('.modal').classList.contains('hidden')
  ) {
    document.querySelector('.modal').classList.add('hidden');
  }
});
