<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { Tile } from '@/game/types/tile'

const props = defineProps<{ grid: Tile[][] }>()

const flatGrid = computed(() => {
  if (!props.grid || !Array.isArray(props.grid)) return []
  return props.grid.flat()
})

console.log('gridBase from store:', props.grid)


const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.grid[0].length}, 10px)`,
  gridTemplateRows: `repeat(${props.grid.length}, 10px)`
}))
</script>

<template>
  <div class="grid" :style="gridStyle">
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
</template>

<style scoped>
.tile {
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  border: 1px solid #111;
}
.tile.dirt { background-color: #8b5e3c; }
.tile.sand { background-color: #e0c28d; }
.tile.water { background-color: #4a90e2; }

.tile.tree { background-color: #164a0c; }
.tile.wall { background-color: #555; }
.tile.building { background-color: #734343; }

.tile.inaccessible { opacity: 0.5; }
</style>
