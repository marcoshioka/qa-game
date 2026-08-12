import Phaser from "phaser";
import { TextureKeys } from "../config/assetKeys";
import { HazardDef } from "../data/types";

export class Hazard extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, def: HazardDef) {
    super(scene, def.x, def.y, TextureKeys.Hazard);

    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }
}
