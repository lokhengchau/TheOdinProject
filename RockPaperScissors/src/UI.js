import './css/UI.css';

import { removeBg } from './background';

function createIntroUI() {
  const divWrap = document.createElement('div');
  divWrap.classList.add('intro-container');

  const h1Title = document.createElement('h1');
  h1Title.innerText = 'RPS';

  const pSubTitle = document.createElement('p');
  pSubTitle.innerText = 'Clash of Choices';

  const btnStart = document.createElement('button');
  btnStart.id = 'btn-start';
  btnStart.innerText = 'Start Game';

  const btnViewAchieve = document.createElement('button');
  btnViewAchieve.id = 'btn-view-achievement';
  btnViewAchieve.innerText = 'Achievements';

  const btnReset = document.createElement('button');
  btnReset.id = 'btn-reset';
  btnReset.innerText = 'Reset Progress';

  divWrap.append(h1Title, pSubTitle, btnStart, btnViewAchieve, btnReset);

  return divWrap;
}

function removeIntroDiv() {
  const introDiv = document.querySelector('.intro-container');
  introDiv.remove();
}

function hideIntroUI() {
  const divCurtain = document.createElement('div');
  divCurtain.classList.add('intro-curtain');

  document.body.append(divCurtain);

  divCurtain.addEventListener('animationend', () => {
    removeBg();
    removeIntroDiv();
    divCurtain.remove();
    // showgameUI
  });
}

function startUI() {
  document.body.append(createIntroUI());
  const btnStart = document.getElementById('btn-start');

  btnStart.addEventListener('click', () => hideIntroUI());
}

export default startUI;
