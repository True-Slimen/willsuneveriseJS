import type {Tile} from '@/game/types/tile'
import {TileType} from '@/game/types/tile'
import type {ParamsNoise} from '@/game/types/noise'
import {generateNoiseMap} from "@/game/procedural/noiseMap.ts";

function applyNoiseLayer(grid: Tile[][], layer: NoiseLayer) {
  const height = grid.length
  const width = grid[0].length
  const noiseMap = layer.customNoiseMap
    ? layer.customNoiseMap(width, height, layer.params)
    : generateNoiseMap(width, height, layer.params)

  const threshold = layer.params.threshold ?? 0.4

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const val = noiseMap[y][x]
      const pass = layer.condition
        ? layer.condition(val, x, y)
        : val > threshold

      if (pass) {
        const tile = grid[y][x]
        tile.type = layer.tileType
        layer.postApply?.(tile)
      }
    }
  }
}
