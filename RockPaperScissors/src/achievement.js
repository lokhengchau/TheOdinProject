import { getPlayerRecord } from "./gameControl";

class Achievement {
  constructor(title, description, fn) {
    this.title = title;
    this.description = description;
    this.achieved = false;
    this.activate = fn;
  }
}

const achievementArray = [
  new Achievement(
    'First Step Success',
    'Winning your first game',
    (playerRecord) => {
      if (playerRecord.win === 1) {
        this.achieved = true;
      }
    },
  ),
];
