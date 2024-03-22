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

const achievementArray = [
  new Achievement(
    'First Step Success',
    'Win your first game',
    firstWin,
  ),
  new Achievement(
    'Fist Loss Lesson',
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
];

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

function checkAchievements(playerRecord) {
  achievementArray.forEach((achievement) => {
    if (achievement.achieved === false) {
      if (achievement.activate(playerRecord)) {
        achievement.done();
        displayAchievement(achievement);
      }
    }
  });
}

export default checkAchievements;
