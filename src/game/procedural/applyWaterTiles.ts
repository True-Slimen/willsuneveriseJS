import type {Tile} from '@/game/types/tile'
import {TileType} from '@/game/types/tile'
import type {ParamsNoise} from '@/game/types/noise'
import {generateNoiseMap} from "@/game/procedural/noiseMap.ts";

export function applyWaterTiles(grid: Tile[][], paramsNoise: ParamsNoise): Tile[][] {

  const wetDirtParamsNoise = {...paramsNoise}
  wetDirtParamsNoise.octaveCount = 2
  wetDirtParamsNoise.amplitude -= 0.4
  wetDirtParamsNoise.persistence = 10.1

  const height = grid.length
  const width = grid[0].length
  const waterMap = generateNoiseMap(width, height, paramsNoise)
  const wetDirtMap = generateNoiseMap(width, height, wetDirtParamsNoise)
  const threshold = paramsNoise.threshold ?? 0.4

  console.log(wetDirtParamsNoise)

  applyNoiseValues(wetDirtMap, TileType.Dirt );
  applyNoiseValues(waterMap, TileType.Water);

  function applyNoiseValues(noiseMap: Tile[][], type: TileType) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (noiseMap[y][x] > threshold) {
          grid[y][x].type = type
          grid[y][x].walkable = type !== TileType.Water
        }
      }
    }
  }

  return grid
}