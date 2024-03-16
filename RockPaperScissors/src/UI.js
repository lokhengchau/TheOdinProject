import './css/UI.css';

import { removeBg } from './background';

function createGameUI() {
  const gameDiv = document.createElement('div');
  gameDiv.classList.add('game-wrapper');
  gameDiv.innerText = 'I am here';
  return gameDiv;
}

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
  if (introDiv) {
    introDiv.remove();
  }
}

function fadeInCurtain() {
  const divCurtain = document.createElement('div');
  divCurtain.classList.add('intro-curtain', 'intro-curtain-close');
  document.body.append(divCurtain);
  return divCurtain;
}

function fadeOutCurtain() {
  const divCurtainRev = document.createElement('div');
  divCurtainRev.classList.add('intro-curtain', 'intro-curtain-rev', 'intro-curtain-open');
  document.body.append(divCurtainRev);
  return divCurtainRev;
}

function transitionIntroGame() {
  const divFadeIn = fadeInCurtain();
  divFadeIn.addEventListener('animationend', () => {
    removeBg();
    removeIntroDiv();
    divFadeIn.remove();
    document.body.append(createGameUI());
    const divFadeOut = fadeOutCurtain();
    divFadeOut.addEventListener('animationend', () => {
      divFadeOut.remove();
    });
  });
}

function startUI() {
  document.body.append(createIntroUI());
  const btnStart = document.getElementById('btn-start');

  btnStart.addEventListener('click', () => transitionIntroGame());
}

export default startUI;
