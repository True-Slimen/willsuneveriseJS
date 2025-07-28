<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {type Tile, TileType} from '@/game/types/tile'

const props = defineProps<{ grid: Tile[][] }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const tileSize = 50

function getTileColor(tile: Tile): string {
  switch (tile.type) {
    case TileType.Dirt: return '#bc9c73'
    case TileType.Sand: return '#e0c28d'
    case TileType.Water: return '#396a88'
    default: return '#999'
  }
}

function getSupportColor(support: string): string | null {
  switch (support.toLowerCase()) {
    case 'tree': return '#9ea152'
    case 'wall': return '#555555'
    case 'building': return '#734343'
    case 'base': return '#40361d'
    default: return null
  }
}

// Fonction qui dessine le carré bleu autour du centre de base
function drawBaseCenterMarker(ctx: CanvasRenderingContext2D, grid: Tile[][]) {
  const height = grid.length
  const width = grid[0]?.length || 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = grid[y][x]
      if (tile.isBaseCenter) {
        ctx.save()
        ctx.strokeStyle = '#40361d'
        ctx.lineWidth = 9

        const squareSize = tileSize * 2
        const offset = tileSize * 0.5

        ctx.strokeRect(
            x * tileSize - offset,
            y * tileSize - offset,
            squareSize,
            squareSize
        )

        ctx.restore()
        return // Il ne peut y avoir qu’un seul centre
      }
    }
  }
}

function drawGrid(ctx: CanvasRenderingContext2D, grid: Tile[][]) {
  if (!grid.length) return
  const width = grid[0].length
  const height = grid.length

  ctx.clearRect(0, 0, width * tileSize, height * tileSize)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = grid[y][x]

      // Sol
      ctx.fillStyle = getTileColor(tile)
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)

      // Bordure
      ctx.strokeStyle = 'rgba(17,17,17,0.29)'
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)

      // Support
      if (tile.support && tile.support.toLowerCase() !== 'none') {
        const supportColor = getSupportColor(tile.support)
        if (supportColor) {
          const padding = tileSize * 0.25
          ctx.fillStyle = supportColor
          ctx.fillRect(
              x * tileSize + padding,
              y * tileSize + padding,
              tileSize - padding * 2,
              tileSize - padding * 2
          )
        }
      }
    }
  }

  // Une fois tout dessiné, on trace le carré central si besoin
  drawBaseCenterMarker(ctx, grid)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawGrid(ctx, props.grid)
})

watch(() => props.grid, (newGrid) => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawGrid(ctx, newGrid)
}, { deep: true })
</script>

<template>
  <canvas
      ref="canvasRef"
      :width="props.grid[0]?.length * tileSize"
      :height="props.grid.length * tileSize"
      style="border: 1px solid black;"
  />
</template>

<style>
canvas {
  margin-top: 50px;
  width: 1300px;
  height: 800px;
}
</style>
