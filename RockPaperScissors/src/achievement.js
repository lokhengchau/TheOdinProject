class Achievement {
  constructor(title, description, fn) {
    this.title = title;
    this.description = description;
    this.achieved = false;
    this.activate = fn;
  }
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
  setTimeout(() => {
    achievementDiv.remove();
  }, 3000);
}

function firstWin(playerRecord) {
  if (playerRecord.score === 1) {
    this.achieved = true;
    displayAchievement(this);
  }
}

function firstLoss(playerRecord) {
  if (playerRecord.loss === 1) {
    this.achieved = true;
    displayAchievement(this);
  }
}

function firstTie(playerRecord) {
  if (playerRecord.tie === 1) {
    this.achieved = true;
    displayAchievement(this);
  }
}

const achievementArray = [
  new Achievement(
    'First Step Success',
    'Winning your first game',
    firstWin,
  ),
  new Achievement(
    'Fist Loss Lesson',
    'Losing your first game',
    firstLoss,
  ),
  new Achievement(
    'Opening Deadlock',
    'Having your first tied game',
    firstTie,
  ),
];

function checkAchievements(playerRecord) {
  achievementArray.forEach((achievement) => {
    if (achievement.achieved === false) {
      achievement.activate(playerRecord);
    }
  });
}

export default checkAchievements;
