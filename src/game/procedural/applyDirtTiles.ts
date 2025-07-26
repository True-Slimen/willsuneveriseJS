import type { Tile } from '@/game/types/tile'
import type { ParamsNoise } from '@/game/types/noise'
import { TileType } from '@/game/types/tile'
import { generateNoiseMap} from "@/game/procedural/noiseMap.ts";

export function applyDirtTiles(grid: Tile[][], paramsNoise: ParamsNoise): Tile[][] {
  const height = grid.length
  const width = grid[0].length
  const noiseMap = generateNoiseMap(width, height, paramsNoise)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (noiseMap[y][x] > 0.4) {
        grid[y][x].type = TileType.Dirt
      }
    }
  }

  return grid
}