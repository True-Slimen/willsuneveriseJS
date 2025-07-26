<script setup lang="ts">
import { useMapStore } from '@/stores/mapStore.ts'
import GameCanvas from './GameCanvas.vue'

const mapStore = useMapStore()

</script>

<template>
  <div class="screen">
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
  margin-top: -62px;
  overflow: hidden;
}
</style>
