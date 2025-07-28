<script setup lang="ts">
import type {ParamsBuildingNoise} from "@/game/types/noise.ts";
const paramsNoise = defineModel<ParamsBuildingNoise>({ required: true })
</script>

<template>
  <div class="form-group">
    <input type="checkbox" v-model="paramsNoise.active" class="active-noise">
    <div class="input-group">
      <label for="octave" class="block text-sm font-medium text-slate-400">Octave : {{paramsNoise.octaveCount}}</label>
      <input id="octave" type="range" min="0" max="7" v-model="paramsNoise.octaveCount" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    </div>

    <div class="input-group">
      <label for="octave" class="block text-sm font-medium text-slate-400">Amplitude : {{paramsNoise.amplitude}}</label>
      <input id="octave" type="range" min="0.001" max="1" step="0.001" v-model="paramsNoise.amplitude" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    </div>

    <div class="input-group">
      <label for="octave" class="block text-sm font-medium text-slate-400">Persistence : {{paramsNoise.persistence}}</label>
      <input id="octave" type="range" min="0.1" max="20" step="0.1" v-model="paramsNoise.persistence" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    </div>

    <div class="input-group">
      <label for="octave" class="block text-sm font-medium text-slate-400">Scale : {{paramsNoise.scale}}</label>
      <input id="octave" type="range" min="0.005" max="0.1" step="0.001" v-model="paramsNoise.scale" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    </div>

    <div class="input-group">
      <label for="octave" class="block text-sm font-medium text-slate-400">Distance min : {{paramsNoise.minDistance}}</label>
      <input id="octave" type="range" min="1" max="100" step="1" v-model="paramsNoise.minDistance" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
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
    <label class="text-sm font-medium text-slate-400">
      <input type="checkbox" v-model="paramsNoise.invert" class="mr-2">
      Inverser la noise
    </label>

    <div class="input-group">
      <label for="dirt-threshold" class="block text-sm font-medium text-slate-400">
        Seuil Dirt : {{ paramsNoise.threshold }}
      </label>
      <input
          id="dirt-threshold"
          type="range"
          min="0"
          max="1"
          step="0.01"
          v-model="paramsNoise.threshold"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  </div>
</template>