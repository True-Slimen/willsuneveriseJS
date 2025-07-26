import type { Tile } from '@/game/types/tile'
import { createEmptyGrid } from './createEmptyGrid'
import { TileType } from '@/game/types/tile'
import { applyDirtTiles } from './applyDirtTiles'
import type { ParamsNoise } from "@/game/types/noise.ts";

export function gridBaseGenerator(width = 95, height = 65, paramsNoise: ParamsNoise): Tile[][] {
  const grid = createEmptyGrid(width, height, TileType.Sand) // Tout en sable
  applyDirtTiles(grid, paramsNoise) // Ajoute du dirt via noise
  return grid
}
