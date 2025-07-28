<script setup lang="ts">
import {gridBaseGenerator} from "@/game/procedural/gridBaseGenerator.ts";
import {useMapStore} from "@/stores/mapStore.ts";
import type {ParamsBuildingNoise, ParamsNoise, ParamsNoiseCollection} from "@/game/types/noise.ts";
import {reactive, watch} from "vue";
import DirtForm from "@/components/form/DirtForm.vue";
import WaterForm from "@/components/form/WaterForm.vue";
import Collapse from "@/components/form/Collapse.vue";
import TreeForm from "@/components/form/TreeForm.vue";
import BuildingForm from "@/components/form/BuildingForm.vue";

const mapStore = useMapStore()

const paramsDirtNoise: ParamsNoise = reactive({
  octaveCount: 3,
  amplitude: 0.15,
  persistence: 0.6,
  scale: 0.09,
  seed: 250,
  x: 0,
  y: 0,
  invert: false,
  threshold: 0.7,
  active: true
})

const paramsWaterNoise: ParamsNoise = reactive({
  octaveCount: 3,
  amplitude: 0.24,
  persistence: 1,
  scale: 0.04,
  seed: 353,
  x: 0,
  y: 0,
  invert: false,
  threshold: 0.8,
  active: true
})

const paramsTreeNoise: ParamsNoise = reactive({
  octaveCount: 4,
  amplitude: 0.85,
  persistence: 10.1,
  scale: 0.06,
  seed: 218,
  x: 0,
  y: 0,
  invert: false,
  threshold: 0.6,
  active: true
})

const paramsBuildingNoise: ParamsBuildingNoise = reactive({
  octaveCount: 6,
  amplitude: 0.359,
  persistence: 11.9,
  scale: 0.08,
  seed: 265,
  x: 8,
  y: -2,
  invert: false,
  threshold: 0.6,
  active: true,
  minDistance: 22,
})

const paramsCollection: ParamsNoiseCollection = reactive({
  dirt: paramsDirtNoise,
  water: paramsWaterNoise,
  tree: paramsTreeNoise,
  building: paramsBuildingNoise,
})

watch(paramsCollection, async () => {
  createMap()
})

function createMap() {
  const newGrid = gridBaseGenerator(95, 65, paramsCollection)
  mapStore.setGridBase(newGrid)
}
</script>

<template>
  <div class="px-3 d-flex gap-1">
    <Collapse class="relative" :title="'Terres fertiles'">
      <DirtForm v-model="paramsDirtNoise" />
    </Collapse>
    <Collapse class="relative" :title="'Étendues d\'eau'">
      <WaterForm v-model="paramsWaterNoise" />
    </Collapse>
    <Collapse class="relative" :title="'Fôret'">
      <TreeForm v-model="paramsTreeNoise" />
    </Collapse>
    <Collapse class="relative" :title="'Bâtiments'">
      <BuildingForm v-model="paramsBuildingNoise" />
    </Collapse>
    <button
        @click="createMap"
        class="mb-4 mt-2 block mx-auto px-4 py-2 bg-gray-700 text-stone-200 rounded"
    >
      <span>Générer une map</span>
    </button>
  </div>
</template>

<style lang="scss">
.active-noise {
  position: absolute;
  top: 13px;
}
</style>
