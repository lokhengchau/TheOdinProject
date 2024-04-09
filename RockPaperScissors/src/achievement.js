import smileyImg from './assets/smiley.png';
import unimpressedImg from './assets/unimpressed.png';

class Achievement {
  constructor(title, description, fn) {
    this.title = title;
    this.description = description;
    this.achieved = false;
    this.activate = fn;
  }

  done() {
    this.achieved = true;
  }
}

function firstWin(playerRecord) {
  if (playerRecord.score === 1) return true;
  return false;
}

function firstLoss(playerRecord) {
  if (playerRecord.loss === 1) return true;
  return false;
}

function firstTie(playerRecord) {
  if (playerRecord.tie === 1) return true;
  return false;
}

function tenWins(playerRecord) {
  if (playerRecord.score === 10) return true;
  return false;
}

function tenLosses(playerRecord) {
  if (playerRecord.loss === 10) return true;
  return false;
}

function winningStreak(playerRecord) {
  const streak = playerRecord.streak.reduce((total, result) => total + (result === 'win'), 0);
  if (streak === 5) return true;
  return false;
}

function losingStreak(playerRecord) {
  const streak = playerRecord.streak.reduce((total, result) => total + (result === 'loss'), 0);
  if (streak === 5) return true;
  return false;
}

function drawingStreak(playerRecord) {
  const streak = playerRecord.streak.reduce((total, result) => total + (result === 'tie'), 0);
  if (streak === 5) return true;
  return false;
}

let achievementArray;

export function initAchievementArray() {
  achievementArray = [
    new Achievement(
      'First Step Success',
      'Win your first game',
      firstWin,
    ),
    new Achievement(
      'First Loss Lesson',
      'Lose your first game',
      firstLoss,
    ),
    new Achievement(
      'Opening Deadlock',
      'Have your first tied game',
      firstTie,
    ),
    new Achievement(
      'Tenacious Winner',
      'Have a total of 10 wins',
      tenWins,
    ),
    new Achievement(
      'Resilient Contestant',
      'Have a total of 10 losses',
      tenLosses,
    ),
    new Achievement(
      'Unstoppable Streak',
      'Win 5 games in a row',
      winningStreak,
    ),
    new Achievement(
      'Unyielding Adversity',
      'Lose 5 games in a row',
      losingStreak,
    ),
    new Achievement(
      'Stalement Specialist',
      'Draw 5 games in a row',
      drawingStreak,
    ),
  ];
}

achievementArray = JSON.parse(localStorage.getItem('rpc-save'));
if (achievementArray === null) {
  initAchievementArray();
}

function displayAchievement(achievement) {
  const achievementPanelDiv = document.querySelector('.achievement-wrapper');
  const achievementDiv = document.createElement('div');
  achievementDiv.classList = 'achievement';

  const titleH2 = document.createElement('h2');
  titleH2.innerText = achievement.title;
  const descriptionP = document.createElement('p');
  descriptionP.innerText = achievement.description;

  achievementDiv.append(titleH2, descriptionP);
  achievementPanelDiv.append(achievementDiv);

  function animatinoEndFn() {
    achievementDiv.removeEventListener('animationend', animatinoEndFn);
    achievementDiv.remove();
  }

  achievementDiv.addEventListener('animationend', animatinoEndFn);
}

export default function checkAchievements(playerRecord) {
  achievementArray.forEach((achievement) => {
    if (achievement.achieved === false) {
      if (achievement.activate(playerRecord)) {
        achievement.done();
        displayAchievement(achievement);
        localStorage.setItem('rpc-save', JSON.stringify(achievementArray));
      }
    }
  });
}

export function getAchivementsList() {
  const achievementListDiv = document.getElementById('achievement-list');
  achievementListDiv.innerHTML = '';

  achievementArray.forEach((achievement) => {
    const div = document.createElement('div');
    div.classList.add('achievement-row');
    if (achievement.achieved) div.classList.add('achieved');

    const img = document.createElement('img');
    img.src = achievement.achieved ? smileyImg : unimpressedImg;

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('achievement-info-wrapper');

    const h2 = document.createElement('h2');
    h2.innerText = achievement.title;

    const p = document.createElement('p');
    p.innerText = achievement.description;

    innerDiv.append(h2, p);
    div.append(img, innerDiv);

    achievementListDiv.append(div);
  });
}
