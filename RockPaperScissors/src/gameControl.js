import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';
import readyImg from './assets/ready.png';

class Record {
  constructor() {
    this.score = 0;
    this.loss = 0;
    this.tie = 0;
    this.rock = 0;
    this.paper = 0;
    this.scissors = 0;
    this.choiceRecord = [];
  }

  win() {
    this.score += 1;
  }

  lose() {
    this.loss += 1;
  }

  draw() {
    this.tie += 1;
  }

  choose(choice) {
    switch (choice) {
      case 'paper':
        this.paper += 1;
        break;
      case 'rock':
        this.rock += 1;
        break;
      default:
        this.scissors += 1;
    }
  }

  get totalGame() {
    return this.score + this.loss + this.tie;
  }

  get winRate() {
    return this.score / this.totalGame();
  }

  get paperRate() {
    return this.paper / this.totalGame();
  }

  get rockRate() {
    return this.rock / this.totalGame();
  }

  get scissorsRate() {
    return this.scissors / this.totalGame();
  }

  /**
   * @param {(arg0: string) => void} choice
   */
  set recordChoice(choice) {
    if (this.choiceRecord.length >= 10) {
      this.choiceRecord.shift();
    }
    this.choiceRecord.unshift(choice);
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

function updateGameMessage(input) {
  const gameMessageP = document.getElementById('game-message');

  switch (input) {
    case 'start':
      gameMessageP.innerText = 'Make your choice.';
      break;
    case 'ready':
      gameMessageP.innerText = 'Rock! paper! scissors!';
      break;
    case 'tie':
      gameMessageP.innerText = 'Shoot!';
      setTimeout(() => {
        gameMessageP.innerText = "It's a tie!";
      }, 500);
      break;
    case 'player':
      gameMessageP.innerText = 'Shoot!';
      setTimeout(() => {
        gameMessageP.innerText = 'You win!';
      }, 500);
      break;
    case 'computer':
      gameMessageP.innerText = 'Shoot!';
      setTimeout(() => {
        gameMessageP.innerText = 'Computer wins!';
      }, 500);
      break;
    default:
      break;
  }
}

function updateChoiceRecordDisplay(playerArr, computerArr) {
  const playerChoiceHistoryDiv = document.getElementById('player-choice-history');
  const computerChoiceHistoryDiv = document.getElementById('computer-choice-history');
  playerChoiceHistoryDiv.innerHTML = '';
  computerChoiceHistoryDiv.innerHTML = '';

  function appendImg(arr, div) {
    arr.forEach((choice) => {
      const img = document.createElement('img');
      if (choice === 'rock') {
        img.src = rockImg;
      } else if (choice === 'paper') {
        img.src = paperImg;
      } else {
        img.src = scissorsImg;
      }
      div.append(img);
    });
  }

  appendImg(playerArr, playerChoiceHistoryDiv);
  appendImg(computerArr, computerChoiceHistoryDiv);
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
  playerRecord.choose(playerChoice);
  computerRecord.choose(computerChoice);
  hidePlayerButtons();
  updateGameMessage('ready');
  await runAnimation();
  showChoices(playerChoice, computerChoice);
  playerRecord.recordChoice = playerChoice;
  computerRecord.recordChoice = computerChoice;

  if (computerChoice === playerChoice) {
    playerRecord.draw();
    computerRecord.draw();
    updateGameMessage('tie');
  } else if ((computerChoice === 'rock' && playerChoice === 'paper')
    || (computerChoice === 'paper' && playerChoice === 'scissors')
    || (computerChoice === 'scissors' && playerChoice === 'rock')) {
    playerRecord.win();
    computerRecord.lose();
    updatePlayerScoreDisplay();
    updateGameMessage('player');
  } else {
    computerRecord.win();
    playerRecord.lose();
    updateComputerScoreDisplay();
    updateGameMessage('computer');
  }

  updateChoiceRecordDisplay(playerRecord.choiceRecord, computerRecord.choiceRecord);

  setTimeout(() => {
    showPlayerButtons();
    updateGameMessage('start');
  }, 2000);
}

export default gameRun;
