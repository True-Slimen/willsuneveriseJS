export type EntityType = 'civilian' | 'zombie'

export interface Entity {
  id: string
  type: EntityType
  x: number
  y: number
  oldX: number
  oldY: number
  state: 'idle' | 'moving' | 'fighting'
}
