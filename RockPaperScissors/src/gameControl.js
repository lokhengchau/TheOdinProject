function runAnimation() {
  const playerChoiceImg = document.getElementById('player-choice-img');
  const computerChoiceImg = document.getElementById('computer-choice-img');

  function promiseAnimationEnd(img) {
    return new Promise((resolve) => {
      function onAnimationEndFn() {
        this.classList.remove('animate-choice');
        this.removeEventListener('animationend', onAnimationEndFn);
        resolve();
      }

      img.addEventListener('animationend', onAnimationEndFn);
      img.classList.add('animate-choice');
    });
  }

  const promisePlayerAnimationEnd = promiseAnimationEnd(playerChoiceImg);
  const promiseComputerAnimationEnd = promiseAnimationEnd(computerChoiceImg);

  return Promise.all([promiseComputerAnimationEnd, promisePlayerAnimationEnd]);
}

function randomComputerChoice() {
  const computerChoice = Math.floor(Math.random() * 3);
  switch (computerChoice) {
    case 0:
      return 'rock';
    case 1:
      return 'papper';
    default:
      return 'scissors';
  }
}

async function gameRun(playerChoice) {
  const computerChoice = randomComputerChoice();
  await runAnimation();
  alert('hey it works');

  // start animation function
  if (computerChoice === playerChoice) {
    // run draw
    return null;
  }

  if ((computerChoice === 'rock' && playerChoice === 'paper')
  || (computerChoice === 'paper' && playerChoice === 'scissors')
  || (computerChoice === 'scissors' && playerChoice === 'rock')) {
    // run player win
    return null;
  }

  // run computer win
  return null;
}

export default gameRun;
