import Phaser from "phaser";
import { TextureKeys } from "../config/assetKeys";
import { EnemyDef } from "../data/types";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private minX: number;
  private maxX: number;
  private speed: number;

  constructor(scene: Phaser.Scene, def: EnemyDef) {
    super(scene, def.x, def.y, TextureKeys.Enemy);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.minX = def.patrolMinX;
    this.maxX = def.patrolMaxX;
    this.speed = def.speed;

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);

    this.setVelocityX(this.speed);
  }

  update(): void {
    if (this.x <= this.minX) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else if (this.x >= this.maxX) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    }
  }
}
