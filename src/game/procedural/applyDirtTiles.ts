import type { Tile } from '@/game/types/tile'
import type { ParamsNoise } from '@/game/types/noise'
import { TileType } from '@/game/types/tile'
import { generateNoiseMap} from "@/game/procedural/noiseMap.ts";


export function applyDirtTiles(grid: Tile[][], paramsNoise: ParamsNoise): Tile[][] {
  console.log("hello")
  const height = grid.length
  const width = grid[0].length
  const noiseMap = generateNoiseMap(width, height, paramsNoise)
  const threshold = paramsNoise.threshold ?? 0.4

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (noiseMap[y][x] > threshold) {
        grid[y][x].type = TileType.Dirt
        //grid[y][x].speedFactor = getSpeedFactorForType(grid[y][x].type)
      }
    }
  }

  return grid
}