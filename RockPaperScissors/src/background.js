import './css/background.css';

import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';

function randomImg() {
  const rand = Math.floor(Math.random() * 3);
  if (rand === 0) {
    return rockImg;
  }
  if (rand === 1) {
    return paperImg;
  }
  return scissorsImg;
}

function createMovingDiv(id) {
  const movingDiv = document.createElement('div');
  movingDiv.id = `moving-div-${id}`;
  movingDiv.classList.add('moving-div');

  const img = document.createElement('img');

  movingDiv.append(img);

  return movingDiv;
}

function createBgDiv(numMovingDiv = 18) {
  const bgDiv = document.createElement('div');
  bgDiv.classList.add('bg-moving-div-container');

  for (let i = 0; i < numMovingDiv; i += 1) {
    bgDiv.append(createMovingDiv(i));
  }

  return bgDiv;
}

function applyMovingDivTopCSS() {
  let topPos = 0;
  const movingDivs = document.querySelectorAll('.moving-div');

  movingDivs.forEach((movingDiv) => {
    const temp = movingDiv;
    temp.style.top = `${topPos}%`;
    topPos += 5;
  });
}

function applyMovingDivAnimationCSS() {
  const movingDivs = document.querySelectorAll('.moving-div');

  function animationLoop(movingDiv) {
    const tempMovingDiv = movingDiv;

    function startAnimationLoop() {
      tempMovingDiv.querySelector('img').src = randomImg();
      tempMovingDiv.style.animationDuration = `${Math.random() * 5 + 2}s`;
      tempMovingDiv.style.animationDelay = `${Math.random() * 3 + 0.5}s`;
      tempMovingDiv.classList.add('moving-div-animated');
    }

    function endAnimationLoop() {
      tempMovingDiv.classList.remove('moving-div-animated');
      setTimeout(() => startAnimationLoop(tempMovingDiv), 100);
    }

    startAnimationLoop(tempMovingDiv);
    tempMovingDiv.addEventListener('animationend', endAnimationLoop);
  }

  movingDivs.forEach((movingDiv) => {
    animationLoop(movingDiv);
  });
}

export function startBg() {
  document.body.append(createBgDiv());
  applyMovingDivTopCSS();
  applyMovingDivAnimationCSS();
}

export function removeBg() {
  const bgDiv = document.querySelector('.bg-moving-div-container');
  if (bgDiv) {
    bgDiv.remove();
  }
}
