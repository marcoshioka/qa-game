import Phaser from "phaser";
import { gameConfig } from "./config/gameConfig";

const game = new Phaser.Game(gameConfig);

const portraitQuery = window.matchMedia("(orientation: portrait)");
const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

function syncRunState(): void {
  const blockedByOrientation = portraitQuery.matches && coarsePointerQuery.matches;

  if (blockedByOrientation) {
    game.loop.sleep();
  } else {
    game.loop.wake();
  }
}

portraitQuery.addEventListener("change", syncRunState);
coarsePointerQuery.addEventListener("change", syncRunState);
syncRunState();
