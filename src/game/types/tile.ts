export enum TileType {
  Dirt = 'dirt',
  Sand = 'sand',
  Water = 'water'
}

export enum TileSupport {
  None = 'none',      // équivalent à null
  Tree = 'tree',
  Wall = 'wall',
  Building = 'building',
  Base = 'base'
}

export interface Tile {
  x: number
  y: number
  type: TileType           // nature du sol
  support: TileSupport     // ce qui est dessus
  walkable: boolean      // déplacement autorisé
  walked: number
  speedFactor: number
  danger: number           // pour IA ou effet de zone
  isBaseCenter: boolean
}

export interface Base {
  centerX: number
  centerY: number
  size: number
  color: string
}