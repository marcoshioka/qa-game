import Phaser from "phaser";
import { SceneKeys } from "../config/assetKeys";
import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig";
import { soundManager } from "../audio/SoundManager";

interface GameOverData {
  score: number;
  reason?: "fall" | "hazard" | "enemy";
}

const REASON_TEXT: Record<string, string> = {
  fall: "Você caiu para fora do build.",
  hazard: "Você pisou em um erro fatal da pipeline.",
  enemy: "Um bug crítico corrompeu seu deploy.",
};

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }

  create(data: GameOverData): void {
    soundManager.playGameOver();

    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;
    const reasonText = REASON_TEXT[data.reason ?? "fall"];
    const isTouch = this.sys.game.device.input.touch;

    this.add
      .text(centerX, centerY - 80, "PIPELINE FALHOU", {
        fontFamily: "monospace",
        fontSize: "44px",
        color: "#ff5c5c",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 20, reasonText, {
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
      .text(
        centerX,
        centerY + 90,
        isTouch ? "TOQUE PARA TENTAR NOVAMENTE" : "PRESSIONE ESPAÇO PARA TENTAR NOVAMENTE",
        {
          fontFamily: "monospace",
          fontSize: "18px",
          color: "#2ecc71",
        }
      )
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
