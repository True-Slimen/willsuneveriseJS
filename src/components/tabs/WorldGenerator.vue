<script setup lang="ts">
import {gridBaseGenerator} from "@/game/procedural/gridBaseGenerator.ts";
import {useMapStore} from "@/stores/mapStore.ts";
import type {ParamsNoise} from "@/game/types/noise.ts";
import {reactive, watch} from "vue";

const mapStore = useMapStore()

const paramsNoise: ParamsNoise = reactive({
  octaveCount: 1,
  amplitude: 0.5,
  persistence: 0.4,
  scale: 0.1,
  seed: 250,
  x: 0,
  y: 0,
})

watch(paramsNoise, async () => {
  createMap()
})

function createMap() {
  const newGrid = gridBaseGenerator(95, 65, paramsNoise)
  mapStore.setGridBase(newGrid)
}
</script>

<template>
  <div class="px-3 d-flex">
    {{paramsNoise.amplitude}}
    <div class="form-group border border-1 border-slate-600 rounded p-2">
      <h5 class="text-center text-md font-medium text-slate-400">Terre fertile</h5>

      <div class="input-group">
        <label for="octave" class="block text-sm font-medium text-slate-400">Octave : {{paramsNoise.octaveCount}}</label>
        <input id="octave" type="range" min="0" max="7" v-model="paramsNoise.octaveCount" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
      </div>

      <div class="input-group">
        <label for="octave" class="block text-sm font-medium text-slate-400">Amplitude : {{paramsNoise.amplitude}}</label>
        <input id="octave" type="range" min="0.01" max="1" step="0.01" v-model="paramsNoise.amplitude" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
      </div>

      <div class="input-group">
        <label for="octave" class="block text-sm font-medium text-slate-400">Persistence : {{paramsNoise.persistence}}</label>
        <input id="octave" type="range" min="0.1" max="1" step="0.1" v-model="paramsNoise.persistence" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
      </div>

      <div class="input-group">
        <label for="octave" class="block text-sm font-medium text-slate-400">Scale : {{paramsNoise.scale}}</label>
        <input id="octave" type="range" min="0.01" max="1" step="0.01" v-model="paramsNoise.scale" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
      </div>

      <div class="input-group">
        <label for="octave" class="block text-sm font-medium text-slate-400">Seed : {{paramsNoise.seed}}</label>
        <input id="octave" type="range" min="1" max="500" step="1" v-model="paramsNoise.seed" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
      </div>

      <div class="input-group">
        <label for="x" class="block text-sm font-medium text-slate-400">Offset X : {{paramsNoise.x}}</label>
        <input
            id="x"
            type="number"
            v-model.number="paramsNoise.x"
            class="w-full rounded border border-slate-500 bg-slate-800 text-white px-2 py-1"
        />
      </div>

      <div class="input-group">
        <label for="y" class="block text-sm font-medium text-slate-400">Offset Y : {{paramsNoise.y}}</label>
        <input
            id="y"
            type="number"
            v-model.number="paramsNoise.y"
            class="w-full rounded border border-slate-500 bg-slate-800 text-white px-2 py-1"
        />
      </div>

    </div>
    <button
        @click="createMap"
        class="mb-4 mt-2 block mx-auto px-4 py-2 bg-gray-700 text-stone-200 rounded"
    >
      <span>Générer une map</span>
    </button>
  </div>
</template>

<style lang="scss">

</style>
