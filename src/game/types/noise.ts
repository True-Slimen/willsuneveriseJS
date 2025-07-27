export interface ParamsNoise {
  octaveCount: number,
  amplitude: number,
  persistence: number,
  scale: number,
  seed: number,
  x: number,
  y: number,
  invert?: boolean,
  threshold?: number,
  active: boolean
}

export interface ParamsNoiseCollection {
  dirt: ParamsNoise,
  water: ParamsNoise,
  tree: ParamsNoise
}