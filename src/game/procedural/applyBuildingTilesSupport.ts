import {type Tile, TileSupport, TileType} from '@/game/types/tile'
import type {ParamsNoise} from '@/game/types/noise'
import {generateNoiseMap} from "@/game/procedural/noiseMap.ts";

export function applyBuildingTilesSupport(grid: Tile[][], paramsNoise: ParamsNoise & { minDistance?: number }): Tile[][] {
  const height = grid.length
  const width = grid[0].length
  const noiseMap = generateNoiseMap(width, height, paramsNoise)
  const threshold = paramsNoise.threshold ?? 0.4
  const minDistance = paramsNoise.minDistance ?? 1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = noiseMap[y][x]

      if (value > threshold && grid[y][x].type !== TileType.Water && isIsolated(x, y, minDistance)) {
        grid[y][x].support = TileSupport.Building
      }
    }
  }

  return grid

  // Vérifie qu'aucun bâtiment ne se trouve dans un carré de minDistance autour
  function isIsolated(x: number, y: number, dist: number): boolean {
    for (let dy = -dist; dy <= dist; dy++) {
      for (let dx = -dist; dx <= dist; dx++) {
        const nx = x + dx
        const ny = y + dy
        if (
          (dx !== 0 || dy !== 0) &&
          nx >= 0 && ny >= 0 && nx < width && ny < height
        ) {
          if (grid[ny][nx].support === TileSupport.Building) {
            return false
          }
        }
      }
    }
    return true
  }
}
