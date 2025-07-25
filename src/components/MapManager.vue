<script setup lang="ts">
import { useMapStore } from '@/stores/mapStore.ts'
import { gridBaseGenerator } from '@/game/procedural/gridBaseGenerator.ts'
import GameCanvas from './GameCanvas.vue'

const mapStore = useMapStore()

function createMap() {
  const newGrid = gridBaseGenerator()
  mapStore.setGridBase(newGrid)
  console.log(mapStore.getGridBase())

}

</script>

<template>
  <div class="screen">
    <div class="menu">
      <button
          @click="createMap"
          class="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Générer une map
      </button>
    </div>
    <GameCanvas v-if="mapStore.getGridBase()" :grid="mapStore.getGridBase()" />
  </div>
</template>

<style>

.screen {
  position: relative;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}
.menu {
  left: 0;
  position: absolute;
  bottom: 0;
  padding: 10px;
  background-color: #535bf2;
}
</style>
