import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Tile } from '@/game/types/tile'
import {unref} from "vue";

export const useMapStore = defineStore('map', () => {
  const gridBase = useStorage<Tile[][] | null>('gridBase', null)

  function setGridBase(grid: Tile[][]) {
    const clean = JSON.stringify(unref(grid))
    console.log(clean)
    gridBase.value = clean
  }

  function getGridBase() {
    if(!gridBase.value) return null
    return JSON.parse(gridBase.value)
  }

  function clearGrid() {
    gridBase.value = null
  }

  return {
    gridBase,
    setGridBase,
    getGridBase,
    clearGrid
  }
})
