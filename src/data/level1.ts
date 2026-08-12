import { LevelData } from "./types";

export const level1: LevelData = {
  name: "Deploy Inicial",
  width: 2750,
  height: 760,
  playerSpawn: { x: 120, y: 600 },
  platforms: [
    { x: 200, y: 650, width: 400, height: 40 },
    { x: 650, y: 596, width: 200, height: 32 },
    { x: 1000, y: 536, width: 200, height: 32 },
    { x: 1360, y: 606, width: 220, height: 32 },
    { x: 1710, y: 516, width: 180, height: 32 },
    { x: 2050, y: 596, width: 200, height: 32 },
    { x: 2450, y: 650, width: 300, height: 40 },
  ],
  collectibles: [
    { x: 650, y: 520 },
    { x: 1000, y: 460 },
    { x: 1360, y: 530 },
    { x: 1710, y: 440 },
    { x: 2050, y: 520 },
  ],
  enemies: [],
  hazards: [],
  exit: { x: 2500, y: 598 },
  killY: 850,
};
