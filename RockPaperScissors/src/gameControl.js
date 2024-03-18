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

function gameRun(playerChoice) {
  const computerChoice = randomComputerChoice();

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
