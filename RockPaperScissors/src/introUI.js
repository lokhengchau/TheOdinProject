import './css/introUI.css';

import { removeBg } from './background';
import { getAchivementsList, initAchievementArray } from './achievement';
import startGameUI from './gameUI';

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
    startGameUI();
    const divFadeOut = fadeOutCurtain();
    divFadeOut.addEventListener('animationend', () => {
      divFadeOut.remove();
    });
  });
}

function achievementdialog() {
  const dialog = document.createElement('dialog');
  dialog.classList.add('achievement-dialog');

  const h1 = document.createElement('h1');
  h1.innerText = 'All Achievements';

  const div = document.createElement('div');
  div.id = 'achievement-list';

  const btn = document.createElement('button');
  btn.innerText = 'Close';

  btn.addEventListener('click', () => {
    dialog.classList.toggle('displayed');
    dialog.close();
  });

  dialog.append(h1, div, btn);
  return dialog;
}

function resetDialog() {
  const dialog = document.createElement('dialog');
  dialog.classList.add('reset-dialog');

  const p = document.createElement('p');
  p.innerText = 'Reset all achievement progress?';

  const buttonConfirm = document.createElement('button');
  buttonConfirm.innerText = 'Yes';

  buttonConfirm.addEventListener('click', () => {
    localStorage.removeItem('rpc-save');
    initAchievementArray();
    dialog.classList.toggle('displayed');
    dialog.close();
  });

  const buttonCancel = document.createElement('button');
  buttonCancel.innerText = 'Nevermind';

  buttonCancel.addEventListener('click', () => {
    dialog.close();
    dialog.classList.toggle('displayed');
  });

  dialog.append(p, buttonConfirm, buttonCancel);
  return dialog;
}

function startIntroUI() {
  document.body.append(createIntroUI());
  document.body.append(achievementdialog());
  document.body.append(resetDialog());

  const btnStart = document.getElementById('btn-start');
  btnStart.addEventListener('click', () => transitionIntroGame());

  const btnAchievement = document.getElementById('btn-view-achievement');
  const dialogAchievement = document.querySelector('.achievement-dialog');
  btnAchievement.addEventListener('click', () => {
    dialogAchievement.showModal();
    dialogAchievement.classList.toggle('displayed');
    getAchivementsList();
  });

  const dialogReset = document.querySelector('.reset-dialog');
  const btnReset = document.getElementById('btn-reset');

  btnReset.addEventListener('click', () => {
    dialogReset.showModal();
    dialogReset.classList.toggle('displayed');
  });
}

export default startIntroUI;
