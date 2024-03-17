function createGameUI() {
  const gameDiv = document.createElement('div');
  gameDiv.classList.add('game-wrapper');
  gameDiv.innerText = 'I am here';
  return gameDiv;
}

function startGameUI() {
  document.body.append(createGameUI());
}

export default startGameUI;
