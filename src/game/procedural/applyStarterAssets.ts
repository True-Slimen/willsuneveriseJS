import {TileType, TileSupport, type Tile} from '@/game/types/tile'

export function applyStarterAssets(grid: Tile[][]): void {
  const height = grid.length
  const width = grid[0].length

  const centerX = Math.floor(width / 2)
  const centerY = Math.floor(height / 2)

  console.log(centerX, centerY)

// 1. Marquer un cercle de Dirt (distance euclidienne depuis le centre)
  const radius = 3
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (dx * dx + dy * dy <= radius * radius) {
        const x = centerX + dx
        const y = centerY + dy
        if (x >= 0 && y >= 0 && x < width && y < height) {
          grid[y][x].type = TileType.Dirt
        }
      }
    }
  }

  // 3. Calculer les positions des 5 cases de base
  const baseTiles: { x: number, y: number }[] = []
  baseTiles.push(
    {x: centerX - 1, y: centerY + 1},
    {x: centerX + 1, y: centerY + 1},
    {x: centerX - 1, y: centerY - 1},
    {x: centerX + 1, y: centerY - 1},
    {x: centerX, y: centerY},
  )

  // const baseTilesCenter: { x: number, y: number } = {x: centerX, y: centerY};

  console.log(grid[centerY][centerX])
  grid[centerY][centerX].isBaseCenter = true;

  // 4. Appliquer le support Base aux tuiles concernées
  for (const {x, y} of baseTiles) {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      grid[y][x].support = TileSupport.Base
      grid[y][x].walkable = false
      grid[y][x].type = TileType.Dirt // au cas où c'est Water
    }
  }
}
