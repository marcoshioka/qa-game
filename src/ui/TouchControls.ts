import Phaser from "phaser";

export interface TouchInputState {
  left: boolean;
  right: boolean;
  jumpPressed: boolean;
}

interface ButtonParts {
  circle: Phaser.GameObjects.Arc;
  label: Phaser.GameObjects.Text;
}

const ALPHA_IDLE = 0.35;
const ALPHA_ACTIVE = 0.65;
const BUTTON_RADIUS = 34;
const MARGIN = 24;

export class TouchControls {
  private leftDown = false;
  private rightDown = false;
  private jumpQueued = false;

  private scene: Phaser.Scene;
  private leftBtn: ButtonParts;
  private rightBtn: ButtonParts;
  private jumpBtn: ButtonParts;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.leftBtn = this.makeButton(scene, "◀");
    this.rightBtn = this.makeButton(scene, "▶");
    this.jumpBtn = this.makeButton(scene, "▲");

    this.bindHold(this.leftBtn.circle, (down) => (this.leftDown = down));
    this.bindHold(this.rightBtn.circle, (down) => (this.rightDown = down));

    this.jumpBtn.circle.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.jumpQueued = true;
      this.jumpBtn.circle.setAlpha(ALPHA_ACTIVE);
    });
    const releaseJump = () => this.jumpBtn.circle.setAlpha(ALPHA_IDLE);
    this.jumpBtn.circle.on(Phaser.Input.Events.POINTER_UP, releaseJump);
    this.jumpBtn.circle.on(Phaser.Input.Events.POINTER_OUT, releaseJump);

    this.layout();
    scene.scale.on(Phaser.Scale.Events.RESIZE, this.layout, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.scale.off(Phaser.Scale.Events.RESIZE, this.layout, this);
    });
  }

  private makeButton(scene: Phaser.Scene, label: string): ButtonParts {
    const circle = scene.add.circle(0, 0, BUTTON_RADIUS, 0xffffff, ALPHA_IDLE);
    circle.setScrollFactor(0).setDepth(50).setInteractive({ useHandCursor: false });

    const text = scene.add
      .text(0, 0, label, {
        fontFamily: "monospace",
        fontSize: "22px",
        color: "#1b1f27",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(51);

    return { circle, label: text };
  }

  private layout(): void {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;
    const y = height - MARGIN - BUTTON_RADIUS;

    const leftX = MARGIN + BUTTON_RADIUS;
    const rightX = leftX + BUTTON_RADIUS * 2 + 18;
    const jumpX = width - MARGIN - BUTTON_RADIUS;

    this.placeButton(this.leftBtn, leftX, y);
    this.placeButton(this.rightBtn, rightX, y);
    this.placeButton(this.jumpBtn, jumpX, y);
  }

  private placeButton(button: ButtonParts, x: number, y: number): void {
    button.circle.setPosition(x, y);
    button.label.setPosition(x, y);
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
