<script setup lang="ts">
import {gridBaseGenerator} from "@/game/procedural/gridBaseGenerator.ts";
import {useMapStore} from "@/stores/mapStore.ts";

const mapStore = useMapStore()

function createMap() {
  const newGrid = gridBaseGenerator()
  mapStore.setGridBase(newGrid)
}
</script>

<template>
  <button
      @click="createMap"
      class="mb-4 px-4 py-2 bg-gray-700 text-stone-200 rounded"
  >
    <span>Générer une map</span>
  </button>
</template>

<style lang="scss">

</style>
