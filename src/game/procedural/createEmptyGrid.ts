import type { Tile } from '@/game/types/tile'
import { TileType, TileSupport } from '@/game/types/tile'
import { useTileUtils } from '@/game/composables/useTilesUtils'

const { isWalkable, getSpeedFactorForType } = useTileUtils()

export function createEmptyGrid(width: number, height: number, type: TileType): Tile[][] {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x): Tile => ({
      x, y,
      type: type,
      support: TileSupport.None,
      walkable: isWalkable(type),
      walked: 0,
      speedFactor: getSpeedFactorForType(type),
      danger: 0
    }))
  )
}
