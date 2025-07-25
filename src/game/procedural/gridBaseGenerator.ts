import type { Tile } from '@/game/types/tile'
import { createEmptyGrid } from './createEmptyGrid'
import { applyDirtTiles } from './applyDirtTiles'

export function gridBaseGenerator(width = 95, height = 65): Tile[][] {
  const grid = createEmptyGrid(width, height)
  applyDirtTiles(grid)
  return grid
}
