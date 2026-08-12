export interface PlatformDef {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PointDef {
  x: number;
  y: number;
}

export interface EnemyDef {
  x: number;
  y: number;
  patrolMinX: number;
  patrolMaxX: number;
  speed: number;
}

export type HazardDef = PointDef;

export interface LevelData {
  name: string;
  width: number;
  height: number;
  playerSpawn: PointDef;
  platforms: PlatformDef[];
  collectibles: PointDef[];
  enemies: EnemyDef[];
  hazards: HazardDef[];
  exit: PointDef;
  killY: number;
}
