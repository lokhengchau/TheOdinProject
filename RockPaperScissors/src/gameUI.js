import './css/gameUI.css';

import gameRun from './gameControl';
import { getAchivementsList } from './achievement';

import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';
import readyImg from './assets/ready.png';

function gameMainScreen() {
  const mainScreenDiv = document.createElement('div');
  mainScreenDiv.classList.add('main-screen-wrapper');
  const computerChoiceDiv = document.createElement('div');
  computerChoiceDiv.classList.add('choice-img-wrapper');
  const computerChoiceImg = document.createElement('img');
  computerChoiceImg.id = 'computer-choice-img';
  computerChoiceImg.src = readyImg;
  computerChoiceDiv.append(computerChoiceImg);

  const gameMessageP = document.createElement('p');
  gameMessageP.id = 'game-message';
  gameMessageP.innerText = 'Make your choice.';

  const playerChoiceDiv = document.createElement('div');
  playerChoiceDiv.classList.add('choice-img-wrapper');
  const playerChoiceImg = document.createElement('img');
  playerChoiceImg.id = 'player-choice-img';
  playerChoiceImg.src = readyImg;
  playerChoiceDiv.append(playerChoiceImg);

  mainScreenDiv.append(computerChoiceDiv, gameMessageP, playerChoiceDiv);
  return mainScreenDiv;
}

function playerChoicePanel() {
  const playerChoiceDiv = document.createElement('div');
  playerChoiceDiv.classList.add('player-choice-wrapper');

  function createButton(type) {
    const btn = document.createElement('button');
    btn.classList.add('choice-button');
    btn.id = `${type}-button`;

    const img = document.createElement('img');
    switch (type) {
      case 'rock':
        img.src = rockImg;
        btn.setAttribute('data-choice', 'rock');
        break;
      case 'paper':
        img.src = paperImg;
        btn.setAttribute('data-choice', 'paper');
        break;
      default:
        img.src = scissorsImg;
        btn.setAttribute('data-choice', 'scissors');
    }
    btn.append(img);
    btn.addEventListener('click', () => {
      gameRun(btn.dataset.choice);
    });

    return btn;
  }

  playerChoiceDiv.append(createButton('rock'), createButton('paper'), createButton('scissors'));

  return playerChoiceDiv;
}

function playerHistroyPanel(player = true) {
  const playerHistroyDiv = document.createElement('div');
  playerHistroyDiv.classList.add('player-info-panel-wrapper');

  const playerScoreDiv = document.createElement('div');
  playerScoreDiv.classList.add('player-score-wrapper');
  playerScoreDiv.innerText = player ? 'Player: ' : 'Computer: ';
  const scoreSpan = document.createElement('span');
  scoreSpan.id = player ? 'player-score' : 'computer-score';
  scoreSpan.innerText = '0';
  playerScoreDiv.append(scoreSpan);

  const choiceHistoryDiv = document.createElement('div');
  choiceHistoryDiv.classList.add('choice-history-wrapper');
  choiceHistoryDiv.id = player ? 'player-choice-history' : 'computer-choice-history';

  const choiceStatsDiv = document.createElement('div');
  choiceStatsDiv.classList.add('choice-stats-wrapper');

  playerHistroyDiv.append(playerScoreDiv, choiceHistoryDiv, choiceStatsDiv);

  return playerHistroyDiv;
}

function createAchievementPanel() {
  const achievementDiv = document.createElement('div');
  achievementDiv.classList.add('achievement-wrapper');
  return achievementDiv;
}

function createAchievementButton() {
  const button = document.createElement('button');
  button.innerText = 'View Achievements';

  button.addEventListener('click', () => {
    const dialog = document.querySelector('.achievement-dialog');
    dialog.showModal();
    dialog.classList.toggle('displayed');
    getAchivementsList();
  });

  return button;
}

function createGameUI() {
  const gameDiv = document.createElement('div');
  gameDiv.classList.add('game-UI-wrapper');

  gameDiv.append(playerHistroyPanel(false));
  gameDiv.append(gameMainScreen());
  gameDiv.append(playerChoicePanel());
  gameDiv.append(playerHistroyPanel(true));
  gameDiv.append(createAchievementButton());
  return gameDiv;
}

function startGameUI() {
  document.body.append(createAchievementPanel());
  document.body.append(createGameUI());
}

export default startGameUI;
