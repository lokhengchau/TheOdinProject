import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';
import readyImg from './assets/ready.png';

class Record {
  constructor() {
    this.score = 0;
  }

  win() {
    this.score += 1;
  }
}

const playerRecord = new Record();
const computerRecord = new Record();

function updatePlayerScoreDisplay() {
  const span = document.getElementById('player-score');
  span.innerText = playerRecord.score;
}

function updateComputerScoreDisplay() {
  const span = document.getElementById('computer-score');
  span.innerText = computerRecord.score;
}

function runAnimation() {
  const playerChoiceImg = document.getElementById('player-choice-img');
  const computerChoiceImg = document.getElementById('computer-choice-img');

  playerChoiceImg.src = readyImg;
  computerChoiceImg.src = readyImg;

  function promiseAnimationEnd(img) {
    return new Promise((resolve) => {
      function onAnimationEndFn() {
        this.classList.remove('animate-choice');
        this.removeEventListener('animationend', onAnimationEndFn);
        resolve();
      }

      img.addEventListener('animationend', onAnimationEndFn);
      img.classList.add('animate-choice');
    });
  }

  const promisePlayerAnimationEnd = promiseAnimationEnd(playerChoiceImg);
  const promiseComputerAnimationEnd = promiseAnimationEnd(computerChoiceImg);

  return Promise.all([promiseComputerAnimationEnd, promisePlayerAnimationEnd]);
}

function hidePlayerButtons() {
  const btns = document.querySelectorAll('.choice-button');
  btns.forEach((btn) => {
    btn.classList.add('hide-button');
  });
}

function showPlayerButtons() {
  const btns = document.querySelectorAll('.choice-button');
  btns.forEach((btn) => {
    btn.classList.remove('hide-button');
  });
}

function showChoices(playerChoice, computerChoice) {
  const playerImg = document.getElementById('player-choice-img');
  const computerImg = document.getElementById('computer-choice-img');

  function changeImg(choice, player = true) {
    const img = player ? playerImg : computerImg;
    switch (choice) {
      case 'rock':
        img.src = rockImg;
        break;
      case 'paper':
        img.src = paperImg;
        break;
      default:
        img.src = scissorsImg;
    }
  }

  changeImg(playerChoice, true);
  changeImg(computerChoice, false);
}

function randomComputerChoice() {
  const computerChoice = Math.floor(Math.random() * 3);
  switch (computerChoice) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    default:
      return 'scissors';
  }
}

async function gameRun(playerChoice) {
  const computerChoice = randomComputerChoice();
  hidePlayerButtons();
  await runAnimation();
  showPlayerButtons();
  showChoices(playerChoice, computerChoice);

  if (computerChoice === playerChoice) {
    // run draw
  } else if ((computerChoice === 'rock' && playerChoice === 'paper')
    || (computerChoice === 'paper' && playerChoice === 'scissors')
    || (computerChoice === 'scissors' && playerChoice === 'rock')) {
    playerRecord.win();
    updatePlayerScoreDisplay();
  } else {
    computerRecord.win();
    updateComputerScoreDisplay();
  }
}

export default gameRun;
