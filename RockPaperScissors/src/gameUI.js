import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';

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
        break;
      case 'paper':
        img.src = paperImg;
        break;
      default:
        img.src = scissorsImg;
    }
    btn.append(img);

    return btn;
  }

  playerChoiceDiv.append(createButton('rock'), createButton('paper'), createButton('scissors'));

  return playerChoiceDiv;
}

function playerHistroyPanel(player = true) {
  const playerHistroyDiv = document.createElement('div');
  playerHistroyDiv.classList.add('choice-history-wrapper');

  const playerScoreDiv = document.createElement('div');
  playerScoreDiv.classList.add('player-score-wrapper');
  playerScoreDiv.innerText = player ? 'Player' : 'Computer';

  playerHistroyDiv.append(playerScoreDiv);

  return playerHistroyDiv;
}

function createGameUI() {
  const gameDiv = document.createElement('div');

  gameDiv.append(playerChoicePanel());
  gameDiv.append(playerHistroyPanel(true));
  gameDiv.append(playerHistroyPanel(false));

  return gameDiv;
}

function startGameUI() {
  document.body.append(createGameUI());
}

export default startGameUI;
