import Phaser from "phaser";
import { gameConfig, GAME_HEIGHT } from "./config/gameConfig";

const MIN_WIDTH = 480;
const MAX_WIDTH = 1400;

function computeWidth(): number {
  const aspect = window.innerWidth / window.innerHeight;
  return Phaser.Math.Clamp(Math.round(GAME_HEIGHT * aspect), MIN_WIDTH, MAX_WIDTH);
}

const game = new Phaser.Game({
  ...gameConfig,
  width: computeWidth(),
  height: GAME_HEIGHT,
});

function resizeToViewport(): void {
  game.scale.getParentBounds();
  game.scale.setGameSize(computeWidth(), GAME_HEIGHT);
}

window.addEventListener("resize", resizeToViewport);
window.addEventListener("orientationchange", resizeToViewport);
