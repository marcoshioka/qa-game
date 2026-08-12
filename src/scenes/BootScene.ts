import Phaser from "phaser";
import { SceneKeys, TextureKeys } from "../config/assetKeys";

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  create(): void {
    this.createPlayerTexture();
    this.createPlatformTexture();
    this.createLogTexture();
    this.createExitTexture();
    this.createEnemyTexture();
    this.createHazardTexture();

    this.scene.start(SceneKeys.Menu);
  }

  private createPlayerTexture(): void {
    const g = this.add.graphics();
    // pernas
    g.fillStyle(0x1f2937, 1);
    g.fillRect(7, 38, 6, 10);
    g.fillRect(19, 38, 6, 10);
    // torso
    g.fillStyle(0x2f81f7, 1);
    g.fillRoundedRect(4, 16, 24, 26, 4);
    // crachá de QA
    g.fillStyle(0xffd166, 1);
    g.fillRoundedRect(19, 22, 7, 9, 1);
    // cabeça
    g.fillStyle(0xffcf9e, 1);
    g.fillCircle(16, 10, 10);
    // óculos
    g.fillStyle(0x111827, 1);
    g.fillRect(6, 8, 8, 4);
    g.fillRect(18, 8, 8, 4);
    g.fillRect(14, 9, 4, 2);
    g.generateTexture(TextureKeys.Player, 32, 48);
    g.destroy();
  }

  private createPlatformTexture(): void {
    const g = this.add.graphics();
    g.fillStyle(0x3a3f4b, 1);
    g.fillRect(0, 0, 64, 32);
    g.fillStyle(0x565d6b, 1);
    g.fillRect(0, 0, 64, 6);
    g.fillStyle(0x24272f, 1);
    g.fillCircle(8, 19, 2);
    g.fillCircle(32, 19, 2);
    g.fillCircle(56, 19, 2);
    g.generateTexture(TextureKeys.Platform, 64, 32);
    g.destroy();
  }

  private createLogTexture(): void {
    const g = this.add.graphics();
    g.fillStyle(0xffd166, 1);
    g.fillRoundedRect(0, 0, 28, 28, 4);
    g.lineStyle(2, 0x7a5b00, 1);
    g.strokeRoundedRect(1, 1, 26, 26, 4);
    g.fillStyle(0x7a5b00, 1);
    g.fillRect(5, 7, 18, 3);
    g.fillRect(5, 13, 18, 3);
    g.fillRect(5, 19, 12, 3);
    g.generateTexture(TextureKeys.Log, 28, 28);
    g.destroy();
  }

  private createExitTexture(): void {
    const g = this.add.graphics();
    g.fillStyle(0x2ecc71, 1);
    g.fillRoundedRect(0, 0, 40, 64, 6);
    g.fillStyle(0x14251b, 1);
    g.fillRoundedRect(6, 8, 28, 40, 4);
    // checkmark de pipeline verde
    g.lineStyle(3, 0x2ecc71, 1);
    g.beginPath();
    g.moveTo(13, 28);
    g.lineTo(18, 34);
    g.lineTo(27, 18);
    g.strokePath();
    g.fillStyle(0x2ecc71, 1);
    g.fillRect(16, 54, 8, 10);
    g.generateTexture(TextureKeys.Exit, 40, 64);
    g.destroy();
  }

  private createEnemyTexture(): void {
    const g = this.add.graphics();
    // pernas
    g.fillStyle(0x2a0a0a, 1);
    g.lineStyle(2, 0x2a0a0a, 1);
    g.beginPath();
    g.moveTo(4, 18);
    g.lineTo(0, 22);
    g.moveTo(4, 22);
    g.lineTo(-1, 26);
    g.moveTo(28, 18);
    g.lineTo(32, 22);
    g.moveTo(28, 22);
    g.lineTo(33, 26);
    g.strokePath();
    // antenas
    g.lineStyle(2, 0x2a0a0a, 1);
    g.beginPath();
    g.moveTo(10, 4);
    g.lineTo(7, -2);
    g.moveTo(22, 4);
    g.lineTo(25, -2);
    g.strokePath();
    // corpo (bug crítico)
    g.fillStyle(0xe53935, 1);
    g.fillEllipse(16, 16, 26, 22);
    g.fillStyle(0x7a1010, 1);
    g.fillEllipse(16, 16, 26, 8);
    // olhos
    g.fillStyle(0xffffff, 1);
    g.fillCircle(11, 14, 3);
    g.fillCircle(21, 14, 3);
    g.fillStyle(0x111827, 1);
    g.fillCircle(11, 14, 1.4);
    g.fillCircle(21, 14, 1.4);
    g.generateTexture(TextureKeys.Enemy, 34, 28);
    g.destroy();
  }

  private createHazardTexture(): void {
    const g = this.add.graphics();
    g.fillStyle(0xff5c5c, 1);
    g.fillTriangle(12, 0, 0, 24, 24, 24);
    g.lineStyle(2, 0x7a1010, 1);
    g.strokeTriangle(12, 0, 0, 24, 24, 24);
    g.fillStyle(0x7a1010, 1);
    g.fillRect(10, 8, 4, 8);
    g.fillRect(10, 18, 4, 3);
    g.generateTexture(TextureKeys.Hazard, 24, 24);
    g.destroy();
  }
}
