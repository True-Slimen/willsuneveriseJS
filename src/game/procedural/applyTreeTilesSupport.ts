import {type Tile, TileSupport, TileType} from '@/game/types/tile'
import type {ParamsNoise} from '@/game/types/noise'
import {generateNoiseMap} from "@/game/procedural/noiseMap.ts";

export function applyTreeTilesSupport(grid: Tile[][], paramsNoise: ParamsNoise): Tile[][] {

  const height = grid.length
  const width = grid[0].length
  const treeMap = generateNoiseMap(width, height, paramsNoise)
  const threshold = paramsNoise.threshold ?? 0.4

  applyNoiseValues(treeMap);

  function applyNoiseValues(noiseMap: number[][]) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (noiseMap[y][x] > threshold && grid[y][x].type != TileType.Water) {
          grid[y][x].support = TileSupport.Tree
        }
      }
    }
  }

  return grid
}