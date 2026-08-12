import Phaser from "phaser";
import { SceneKeys } from "../config/assetKeys";
import { GAME_WIDTH } from "../config/gameConfig";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Menu);
  }

  create(): void {
    const centerX = GAME_WIDTH / 2;

    this.add
      .text(centerX, 150, "BUG HUNTER", {
        fontFamily: "monospace",
        fontSize: "56px",
        color: "#2f81f7",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 205, "Escape da Pipeline", {
        fontFamily: "monospace",
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(
        centerX,
        300,
        "Colete os logs, desvie dos gaps quebrados\ne alcance a saída da pipeline.",
        {
          fontFamily: "monospace",
          fontSize: "18px",
          color: "#9aa4b2",
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.add
      .text(centerX, 380, "← → mover   ↑ pular", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#ffd166",
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(centerX, 450, "PRESSIONE ESPAÇO PARA COMEÇAR", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#2ecc71",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: startText,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    const start = () => this.scene.start(SceneKeys.Game);

    this.input.keyboard!.once("keydown-SPACE", start);
    this.input.once("pointerdown", start);
  }
}
