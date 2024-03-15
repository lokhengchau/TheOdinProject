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
  img.src = randomImg();
  movingDiv.append(img);
  return movingDiv;
}

function createBgDiv() {
  const bgDiv = document.createElement('div');
  bgDiv.classList.add('bg-moving-div-container');
  for (let i = 0; i < 10; i += 1) {
    bgDiv.append(createMovingDiv(i));
  }
  document.body.append(bgDiv);
}

export default createBgDiv;
