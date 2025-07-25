import type { Tile } from '@/game/types/tile'
import { TileType } from '@/game/types/tile'

export function applyDirtTiles(grid: Tile[][]): void {
  const height = grid.length
  const width = grid[0].length

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const noise = Math.random() // TODO: remplacer par real noise
      if (noise > 0.7) {
        grid[y][x].type = TileType.Dirt
      }
    }
  }
}
