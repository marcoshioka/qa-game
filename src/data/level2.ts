import { LevelData } from "./types";

export const level2: LevelData = {
  name: "Merge Conflituoso",
  width: 2850,
  height: 800,
  playerSpawn: { x: 120, y: 600 },
  platforms: [
    { x: 200, y: 650, width: 400, height: 40 },
    { x: 660, y: 596, width: 220, height: 32 },
    { x: 1030, y: 526, width: 220, height: 32 },
    { x: 1380, y: 586, width: 180, height: 32 },
    { x: 1730, y: 506, width: 220, height: 32 },
    { x: 2080, y: 576, width: 180, height: 32 },
    { x: 2485, y: 650, width: 330, height: 40 },
  ],
  collectibles: [
    { x: 660, y: 520 },
    { x: 1030, y: 450 },
    { x: 1380, y: 510 },
    { x: 1730, y: 430 },
    { x: 2080, y: 500 },
  ],
  enemies: [
    { x: 1030, y: 496, patrolMinX: 950, patrolMaxX: 1110, speed: 70 },
    { x: 1730, y: 476, patrolMinX: 1650, patrolMaxX: 1810, speed: 85 },
  ],
  hazards: [
    { x: 300, y: 618 },
    { x: 1420, y: 558 },
  ],
  exit: { x: 2600, y: 598 },
  killY: 900,
};
