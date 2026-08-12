import Phaser from "phaser";
import { TextureKeys } from "../config/assetKeys";

export class Collectible extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TextureKeys.Log);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    body.setSize(this.width * 1.4, this.height * 1.4);

    scene.tweens.add({
      targets: this,
      y: y - 8,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}
