import Phaser from "phaser";
import { TextureKeys } from "../config/assetKeys";
import { soundManager } from "../audio/SoundManager";

const MOVE_SPEED = 240;
const JUMP_VELOCITY = -560;

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TextureKeys.Player);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
    this.setBounce(0.05);
    this.setSize(this.width * 0.7, this.height * 0.9);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    const onGround = this.body!.blocked.down || this.body!.touching.down;

    if (cursors.left.isDown) {
      this.setVelocityX(-MOVE_SPEED);
      this.setFlipX(true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(MOVE_SPEED);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.up) && onGround) {
      this.setVelocityY(JUMP_VELOCITY);
      soundManager.playJump();
    }
  }
}
