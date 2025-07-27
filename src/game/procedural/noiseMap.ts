import { makeNoise2D } from 'open-simplex-noise'
import type { ParamsNoise } from '@/game/types/noise'

export function generateNoiseMap(width: number, height: number, params: ParamsNoise): number[][] {
  const noise2D = makeNoise2D(params.seed)
  const map: number[][] = []

  for (let y = 0; y < height; y++) {
    const row: number[] = []

    for (let x = 0; x < width; x++) {
      let frequency = 1
      let amplitude = 1
      let maxValue = 0
      let noiseValue = 0

      for (let octave = 0; octave < params.octaveCount; octave++) {
        const sampleX = (x + params.x) * params.scale * frequency
        const sampleY = (y + params.y) * params.scale * frequency

        const value = noise2D(sampleX, sampleY)
        noiseValue += value * amplitude

        maxValue += amplitude
        amplitude *= params.amplitude         // ou persistence, les deux noms sont utilisés
        frequency *= params.persistence       // inversement aussi parfois
      }

      let normalized = (noiseValue / maxValue + 1) / 2
      if (params.invert) {
        normalized = 1 - normalized
      }
      row.push(normalized)

    }

    map.push(row)
  }

  return map
}