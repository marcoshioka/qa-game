import Phaser from "phaser";

export interface TouchInputState {
  left: boolean;
  right: boolean;
  jumpPressed: boolean;
}

const ALPHA_IDLE = 0.35;
const ALPHA_ACTIVE = 0.65;
const BUTTON_RADIUS = 34;
const MARGIN = 24;

export class TouchControls {
  private leftDown = false;
  private rightDown = false;
  private jumpQueued = false;

  constructor(scene: Phaser.Scene) {
    const { width, height } = scene.cameras.main;
    const y = height - MARGIN - BUTTON_RADIUS;

    const leftX = MARGIN + BUTTON_RADIUS;
    const rightX = leftX + BUTTON_RADIUS * 2 + 18;
    const jumpX = width - MARGIN - BUTTON_RADIUS;

    const leftBtn = this.makeButton(scene, leftX, y, "◀");
    const rightBtn = this.makeButton(scene, rightX, y, "▶");
    const jumpBtn = this.makeButton(scene, jumpX, y, "▲");

    this.bindHold(leftBtn, (down) => (this.leftDown = down));
    this.bindHold(rightBtn, (down) => (this.rightDown = down));

    jumpBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.jumpQueued = true;
      jumpBtn.setAlpha(ALPHA_ACTIVE);
    });
    const releaseJump = () => jumpBtn.setAlpha(ALPHA_IDLE);
    jumpBtn.on(Phaser.Input.Events.POINTER_UP, releaseJump);
    jumpBtn.on(Phaser.Input.Events.POINTER_OUT, releaseJump);
  }

  private makeButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string
  ): Phaser.GameObjects.Arc {
    const circle = scene.add.circle(x, y, BUTTON_RADIUS, 0xffffff, ALPHA_IDLE);
    circle.setScrollFactor(0).setDepth(50).setInteractive({ useHandCursor: false });

    scene.add
      .text(x, y, label, {
        fontFamily: "monospace",
        fontSize: "22px",
        color: "#1b1f27",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(51);

    return circle;
  }

  private bindHold(
    button: Phaser.GameObjects.Arc,
    setState: (down: boolean) => void
  ): void {
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      setState(true);
      button.setAlpha(ALPHA_ACTIVE);
    });

    const release = () => {
      setState(false);
      button.setAlpha(ALPHA_IDLE);
    };

    button.on(Phaser.Input.Events.POINTER_UP, release);
    button.on(Phaser.Input.Events.POINTER_OUT, release);
  }

  getState(): TouchInputState {
    const jumpPressed = this.jumpQueued;
    this.jumpQueued = false;
    return { left: this.leftDown, right: this.rightDown, jumpPressed };
  }
}
