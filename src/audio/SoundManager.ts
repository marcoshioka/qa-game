type ToneType = OscillatorType;

class SoundManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private tone(
    freq: number,
    duration: number,
    type: ToneType = "square",
    startDelay = 0,
    volume = 0.15
  ): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    const startTime = ctx.currentTime + startDelay;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  playJump(): void {
    this.tone(520, 0.12, "square");
  }

  playCollect(): void {
    this.tone(880, 0.08, "square");
    this.tone(1320, 0.1, "square", 0.06);
  }

  playHazardHit(): void {
    this.tone(180, 0.25, "sawtooth");
  }

  playGameOver(): void {
    this.tone(300, 0.15, "sawtooth");
    this.tone(220, 0.15, "sawtooth", 0.15);
    this.tone(140, 0.3, "sawtooth", 0.3);
  }

  playVictory(): void {
    this.tone(523.25, 0.12, "square");
    this.tone(659.25, 0.12, "square", 0.12);
    this.tone(783.99, 0.12, "square", 0.24);
    this.tone(1046.5, 0.25, "square", 0.36);
  }

  playLevelComplete(): void {
    this.tone(659.25, 0.1, "square");
    this.tone(880, 0.15, "square", 0.1);
  }
}

export const soundManager = new SoundManager();
