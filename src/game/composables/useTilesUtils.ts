import { TileType } from '@/game/types/tile'

type TileTypeConfig = {
  walkable: boolean
  speedFactor: number
}

// Configuration centralisée des types de tuiles
const tileTypeConfig: Record<TileType, TileTypeConfig> = {
  [TileType.Dirt]: { walkable: true, speedFactor: 1.0 },
  [TileType.Sand]: { walkable: true, speedFactor: 0.7 },
  [TileType.Water]: { walkable: false, speedFactor: 0.4 },
}

// Composable
export function useTileUtils() {
  // Récupère le facteur de vitesse pour un type de tuile
  function getSpeedFactorForType(type: TileType): number {
    return tileTypeConfig[type]?.speedFactor ?? 1.0
  }

  // Récupère la propriété "walkable" d'une tuile
  function isWalkable(type: TileType): boolean {
    return tileTypeConfig[type]?.walkable ?? true
  }

  // Retourne toute la config d’un type
  function getTileConfig(type: TileType): TileTypeConfig {
    return tileTypeConfig[type] ?? { walkable: true, speedFactor: 1.0 }
  }

  return {
    getSpeedFactorForType,
    isWalkable,
    getTileConfig,
  }
}
