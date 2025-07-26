<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import type { Tile } from '@/game/types/tile'

const props = defineProps<{ grid: Tile[][] }>()

const flatGrid = computed(() => {
  if (!props.grid || !Array.isArray(props.grid)) return []
  return props.grid.flat()
})
const zoomLevel = ref(0.2)
const originX = ref('50%')
const originY = ref('50%')

// Pour gérer le déplacement
const isPanning = ref(false)
const panStartX = ref(0)
const panStartY = ref(0)
const translateX = ref(0)
const translateY = ref(0)

function onWheel(event: WheelEvent) {
  event.preventDefault()

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()

  // Calcul du pourcentage de la souris relative à la div canvas-wrapper
  const offsetX = event.clientX - rect.left
  const offsetY = event.clientY - rect.top

  originX.value = `${(offsetX / rect.width) * 100}%`
  originY.value = `${(offsetY / rect.height) * 100}%`

  const delta = -event.deltaY
  const zoomChange = delta > 0 ? 0.1 : -0.1
  const nextZoom = zoomLevel.value + zoomChange
  zoomLevel.value = Math.min(5, Math.max(0.2, nextZoom)) // Zoom mini à 0.75
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function onMouseDown(event: MouseEvent) {
  console.log('heere')
  if (event.button !== 1) return // Seulement clic molette (bouton 1)
  console.log('here 2')
  event.preventDefault()
  isPanning.value = true
  panStartX.value = event.clientX - translateX.value
  panStartY.value = event.clientY - translateY.value

  // Pour capter le mousemove et mouseup partout sur la page
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(event: MouseEvent) {
  if (!isPanning.value) return
  translateX.value = clamp(event.clientX - panStartX.value, -150, 150)
  translateY.value = clamp(event.clientY - panStartY.value, -150, 150)
}

function onMouseUp(event: MouseEvent) {
  if (event.button !== 1) return
  isPanning.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}


const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.grid[0].length}, 50px)`,
  gridTemplateRows: `repeat(${props.grid.length}, 50px)`,
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${zoomLevel.value})`,
  transformOrigin: `${originX.value} ${originY.value}`,
  cursor: isPanning.value ? 'grabbing' : 'default',
}))
</script>

<template>
  <div @wheel.prevent="onWheel" class="">
    {{translateX}}
    {{translateY}}
    <div @mousedown="onMouseDown" class="grid" :style="gridStyle">
      <div
          v-for="tile in flatGrid"
          :key="`${tile.x}-${tile.y}`"
          class="tile"
          :class="[
          tile.type.toLowerCase(),
          tile.support !== 'none' ? tile.support.toLowerCase() : '',
          { inaccessible: !tile.accessible }
        ]"
      />
    </div>
  </div>
</template>

<style scoped>
.tile {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid rgba(17, 17, 17, 0.29);
}
.tile.dirt { background-color: #a17351; }
.tile.sand { background-color: #e0c28d; }
.tile.water { background-color: #4a90e2; }

.tile.tree { background-color: #164a0c; }
.tile.wall { background-color: #555; }
.tile.building { background-color: #734343; }

.tile.inaccessible { opacity: 0.5; }
</style>
