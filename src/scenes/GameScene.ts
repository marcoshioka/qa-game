import Phaser from "phaser";
import { SceneKeys, TextureKeys } from "../config/assetKeys";
import { Player } from "../entities/Player";
import { Collectible } from "../entities/Collectible";
import { Enemy } from "../entities/Enemy";
import { Hazard } from "../entities/Hazard";
import { levels } from "../data/levels";
import { LevelData } from "../data/types";
import { soundManager } from "../audio/SoundManager";

interface GameSceneData {
  levelIndex?: number;
  score?: number;
}

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private collectibles!: Phaser.Physics.Arcade.Group;
  private exitSprite!: Phaser.Physics.Arcade.Sprite;
  private enemies: Enemy[] = [];
  private hazards: Hazard[] = [];
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hudText!: Phaser.GameObjects.Text;
  private currentLevel!: LevelData;
  private levelIndex = 0;
  private score = 0;
  private isEnding = false;

  constructor() {
    super(SceneKeys.Game);
  }

  init(data: GameSceneData): void {
    this.levelIndex = data.levelIndex ?? 0;
    this.score = data.score ?? 0;
    this.isEnding = false;
    this.enemies = [];
    this.hazards = [];
  }

  create(): void {
    this.currentLevel = levels[this.levelIndex];

    this.physics.world.setBounds(0, 0, this.currentLevel.width, this.currentLevel.height);
    this.cameras.main.setBounds(0, 0, this.currentLevel.width, this.currentLevel.height);

    this.buildPlatforms();
    this.buildExit();
    this.buildCollectibles();
    this.buildHazards();
    this.buildEnemies();

    this.player = new Player(
      this,
      this.currentLevel.playerSpawn.x,
      this.currentLevel.playerSpawn.y
    );

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.collectibles,
      this.handleCollect,
      undefined,
      this
    );
    this.physics.add.overlap(this.player, this.exitSprite, this.handleExit, undefined, this);
    this.physics.add.overlap(this.player, this.hazards, this.handleHazardHit, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.handleEnemyHit, undefined, this);

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.buildHud();
    this.showLevelBanner();
  }

  update(): void {
    if (this.isEnding) return;

    this.player.update(this.cursors);
    this.enemies.forEach((enemy) => enemy.update());

    if (this.player.y > this.currentLevel.killY) {
      this.handleFall();
    }
  }

  private buildPlatforms(): void {
    this.platforms = this.physics.add.staticGroup();

    this.currentLevel.platforms.forEach((p) => {
      const platform = this.platforms.create(
        p.x,
        p.y,
        TextureKeys.Platform
      ) as Phaser.Physics.Arcade.Sprite;
      platform.setDisplaySize(p.width, p.height);
      platform.refreshBody();
    });
  }

  private buildCollectibles(): void {
    this.collectibles = this.physics.add.group();

    this.currentLevel.collectibles.forEach((c) => {
      const log = new Collectible(this, c.x, c.y);
      this.collectibles.add(log);
    });
  }

  private buildExit(): void {
    this.exitSprite = this.physics.add.staticSprite(
      this.currentLevel.exit.x,
      this.currentLevel.exit.y,
      TextureKeys.Exit
    );
  }

  private buildHazards(): void {
    this.hazards = this.currentLevel.hazards.map((def) => new Hazard(this, def));
  }

  private buildEnemies(): void {
    this.enemies = this.currentLevel.enemies.map((def) => new Enemy(this, def));
  }

  private buildHud(): void {
    this.hudText = this.add
      .text(16, 16, this.hudLabel(), {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#ffd166",
      })
      .setScrollFactor(0)
      .setDepth(10);
  }

  private hudLabel(): string {
    return `Fase ${this.levelIndex + 1}/${levels.length}  |  Logs: ${this.score}`;
  }

  private showLevelBanner(): void {
    const banner = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 100,
        `FASE ${this.levelIndex + 1}: ${this.currentLevel.name.toUpperCase()}`,
        {
          fontFamily: "monospace",
          fontSize: "26px",
          color: "#ffffff",
          backgroundColor: "#000000aa",
          padding: { x: 12, y: 8 },
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(20);

    this.tweens.add({
      targets: banner,
      alpha: 0,
      delay: 1400,
      duration: 500,
      onComplete: () => banner.destroy(),
    });
  }

  private handleCollect: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (
    _player,
    log
  ) => {
    (log as Phaser.Physics.Arcade.Sprite).destroy();
    this.score += 10;
    this.hudText.setText(this.hudLabel());
    soundManager.playCollect();
  };

  private handleExit = (): void => {
    if (this.isEnding) return;
    this.isEnding = true;

    const nextIndex = this.levelIndex + 1;
    if (nextIndex < levels.length) {
      soundManager.playLevelComplete();
      this.scene.start(SceneKeys.Game, { levelIndex: nextIndex, score: this.score });
    } else {
      this.scene.start(SceneKeys.Victory, { score: this.score });
    }
  };

  private handleHazardHit = (): void => {
    if (this.isEnding) return;
    this.isEnding = true;
    soundManager.playHazardHit();
    this.scene.start(SceneKeys.GameOver, { score: this.score, reason: "hazard" });
  };

  private handleEnemyHit = (): void => {
    if (this.isEnding) return;
    this.isEnding = true;
    soundManager.playHazardHit();
    this.scene.start(SceneKeys.GameOver, { score: this.score, reason: "enemy" });
  };

  private handleFall(): void {
    if (this.isEnding) return;
    this.isEnding = true;
    this.scene.start(SceneKeys.GameOver, { score: this.score, reason: "fall" });
  }
}
