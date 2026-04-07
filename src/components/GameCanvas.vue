<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from 'vue'
import {type Tile, TileSupport, TileType} from '@/game/types/tile'

const props = defineProps<{ grid: Tile[][] }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const tileSize = 30

// Zoom & pan state
const scale = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const isPanning = ref(false)
const panStart = { x: 0, y: 0 }

function onWheel(event: WheelEvent) {
  event.preventDefault()
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  // Zoom centré sur le curseur
  const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9
  const newScale = Math.min(4, Math.max(0.2, scale.value * zoomFactor))

  // Ajuster l'offset pour que le point sous le curseur reste fixe
  offsetX.value = mouseX - (mouseX - offsetX.value) * (newScale / scale.value)
  offsetY.value = mouseY - (mouseY - offsetY.value) * (newScale / scale.value)
  scale.value = newScale

  redraw()
}

function onMouseDown(event: MouseEvent) {
  if (event.button !== 1) return // Clic molette uniquement
  event.preventDefault()
  isPanning.value = true
  panStart.x = event.clientX - offsetX.value
  panStart.y = event.clientY - offsetY.value
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(event: MouseEvent) {
  if (!isPanning.value) return
  offsetX.value = event.clientX - panStart.x
  offsetY.value = event.clientY - panStart.y
  redraw()
}

function onMouseUp(event: MouseEvent) {
  if (event.button !== 1) return
  isPanning.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

function getTileColor(tile: Tile): string {
  switch (tile.type) {
    case TileType.Dirt: return '#bc9c73'
    case TileType.Sand: return '#e0c28d'
    case TileType.Water: return '#396a88'
    default: return '#999'
  }
}

// Chaque tuile fait 32×32 px dans l’image par exemple
const SPRITE_SIZE = 64

const tileSprites: Record<TileType, { sx: number, sy: number }> = {
  [TileType.Dirt]: { sx: 127, sy: 64 },     // à ajuster selon ta sprite sheet
  [TileType.Sand]: { sx: 0, sy: 0 },
  [TileType.Water]: { sx: 80, sy: 32 },  // exemple : 64px après Sand
}

const tileSupportSprites: Record<any, { sx: number, sy: number }> = {
  [TileSupport.Tree]: { sx: 0, sy: 0 }
}
// Sol

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
        ctx.lineWidth = 2

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

const tileImage = new Image();
import wastelandImg from '@/assets/images/wasteland-bg.png'
tileImage.src = wastelandImg

const tileWaterImage = new Image();
import waterImg from '@/assets/images/water.png'
tileWaterImage.src = waterImg

const treeImage = new Image();
import treePng from '@/assets/images/tree-1.png'
treeImage.src = treePng;

function redraw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  drawGrid(ctx, props.grid)
}

function drawGrid(ctx: CanvasRenderingContext2D, grid: Tile[][]) {
  if (!grid.length) return
  const canvas = ctx.canvas

  // Clear en espace écran (ignore le transform)
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.restore()

  // Appliquer le transform zoom/pan
  ctx.save()
  ctx.setTransform(scale.value, 0, 0, scale.value, offsetX.value, offsetY.value)

  const width = grid[0].length
  const height = grid.length

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = grid[y][x]

      const sprite = tileSprites[tile.type]
      if (tile.type != 'water' && sprite && tileImage.complete) {
        ctx.drawImage(
            tileImage,
            sprite.sx, sprite.sy,
            SPRITE_SIZE, SPRITE_SIZE,
            x * tileSize, y * tileSize,
            tileSize, tileSize
        )
      }else if (tile.type === 'water' && sprite && tileImage.complete) {
        ctx.drawImage(
            tileWaterImage,
            sprite.sx, sprite.sy,
            16, 16,
            x * tileSize, y * tileSize,
            tileSize, tileSize
        )
      } else {
        // fallback couleur
        ctx.fillStyle = getTileColor(tile)
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
      }

      // Bordure
      ctx.strokeStyle = 'rgba(17,17,17,0.29)'
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)

      // Support
      if (tile.support && tile.support.toLowerCase() !== 'none') {
        const supportColor = getSupportColor(tile.support)
        if(tile.support && tile.support.toLowerCase() === 'tree') {
          const spriteSupport = tileSupportSprites[tile.support]
          if (spriteSupport && treeImage.complete) {
            const factor = getRandomSize(0.5, 1.2)

            // Décalage aléatoire pour donner une impression naturelle
            const treeOffsetX = getRandomOffset(tileSize, factor)
            const treeOffsetY = getRandomOffset(tileSize, factor)

            ctx.drawImage(
                treeImage,
                sprite.sx, sprite.sy,
                SPRITE_SIZE, SPRITE_SIZE,  // taille source (pas * factor ici)
                x * tileSize + treeOffsetX,
                y * tileSize + treeOffsetY,
                SPRITE_SIZE * factor,
                SPRITE_SIZE * factor
            )
          }
        }else if (supportColor && tile.support.toLowerCase() !== 'tree') {
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

  ctx.restore() // Fin du transform zoom/pan
}

function getRandomSize(min: number, max: number) {
  const minCeiled = min;
  const maxFloored = max;
  return Math.random() * (maxFloored - minCeiled) + minCeiled; // The maximum is exclusive and the minimum is inclusive
}

function getRandomOffset(tileSize: number, factor: number): number {
  const size = SPRITE_SIZE * factor
  const maxOffset = tileSize - size
  return Math.random() * maxOffset
}


function getTileFromMouseEvent(event: MouseEvent): Tile | null {
  const canvas = canvasRef.value
  if (!canvas) return null

  const rect = canvas.getBoundingClientRect()
  // Convertir les coords écran en coords monde (inverse du transform)
  const x = (event.clientX - rect.left - offsetX.value) / scale.value
  const y = (event.clientY - rect.top - offsetY.value) / scale.value

  const gridX = Math.floor(x / tileSize)
  const gridY = Math.floor(y / tileSize)

  const row = props.grid[gridY]
  if (!row) return null

  return row[gridX] || null
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  tileImage.onload = () => {
    drawGrid(ctx, props.grid) // seulement après que l’image soit prête
  }

  canvas.addEventListener('wheel', onWheel, { passive: false })
  canvas.addEventListener('mousedown', onMouseDown)

  canvas.addEventListener('mousemove', (event) => {
    hoveredTile.value = getTileFromMouseEvent(event)
  })

  canvas.addEventListener('click', () => {
    selectedTile.value = hoveredTile.value;
  })
})

watch(() => props.grid, (newGrid) => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawGrid(ctx, newGrid)
}, { deep: true })

const hoveredTile = ref<Tile | null>(null)
const selectedTile = ref<Tile | null>(null)
</script>

<template>
  <canvas
      ref="canvasRef"
      :width="1300"
      :height="800"
      :style="{ border: '1px solid black', cursor: isPanning ? 'grabbing' : 'default' }"
  />
  <div class="absolute right-2">
    <div v-if="hoveredTile" style="margin-top: 1rem; font-family: monospace;" class="bg-slate-600 text-shadow-slate-200 p-1 rounded">
      <strong>Tile Info:</strong><br>
      Type: {{ hoveredTile.type }}<br>
      Support: {{ hoveredTile.support || 'none' }}<br>
      Center: {{ hoveredTile.isBaseCenter ? 'yes' : 'no' }}<br>
      Walkable: {{ hoveredTile.walkable ? 'yes' : 'no' }}
      <hr class="w-full">
      X: {{hoveredTile.x}}, Y: {{hoveredTile.y}}
    </div>
    <div v-if="selectedTile" style="margin-top: 1rem; font-family: monospace;" class="bg-slate-600 text-shadow-slate-200 p-1 rounded">
      <strong>Selected tile Info:</strong><br>
      X: {{selectedTile.x}}, Y: {{selectedTile.y}}
    </div>
  </div>
</template>

<style>
canvas {
  margin-top: 50px;
  //width: 1300px;
  //height: 800px;
}
</style>
