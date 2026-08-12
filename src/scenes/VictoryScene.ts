import Phaser from "phaser";
import { SceneKeys } from "../config/assetKeys";
import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig";
import { soundManager } from "../audio/SoundManager";

interface VictoryData {
  score: number;
}

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Victory);
  }

  create(data: VictoryData): void {
    soundManager.playVictory();

    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    this.add
      .text(centerX, centerY - 80, "BUILD VERDE!", {
        fontFamily: "monospace",
        fontSize: "44px",
        color: "#2ecc71",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 20, "Você escapou da pipeline quebrada.", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#9aa4b2",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 20, `Logs coletados: ${data.score ?? 0}`, {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#ffd166",
      })
      .setOrigin(0.5);

    const retryText = this.add
      .text(centerX, centerY + 90, "PRESSIONE ESPAÇO PARA JOGAR NOVAMENTE", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#2f81f7",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: retryText,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    const retry = () => this.scene.start(SceneKeys.Game);

    this.input.keyboard!.once("keydown-SPACE", retry);
    this.input.once("pointerdown", retry);
  }
}
