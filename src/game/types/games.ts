export interface GameSystem {
  interval: number
  fn: () => void
}