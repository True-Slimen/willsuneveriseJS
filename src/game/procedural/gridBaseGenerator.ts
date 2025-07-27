import type { Tile } from '@/game/types/tile'
import { createEmptyGrid } from './createEmptyGrid'
import { TileType } from '@/game/types/tile'
import { applyDirtTiles } from './applyDirtTiles'
import {applyWaterTiles} from "@/game/procedural/applyWaterTiles.ts";
import {applyTreeTilesSupport} from "@/game/procedural/applyTreeTilesSupport.ts";
import type {ParamsNoiseCollection} from "@/game/types/noise.ts";

export function gridBaseGenerator(width = 95, height = 65, paramsNoise: ParamsNoiseCollection): Tile[][] {
  const grid = createEmptyGrid(width, height, TileType.Sand) // Tout en sable

  if(paramsNoise.dirt.active) {
    applyDirtTiles(grid, paramsNoise.dirt); // Ajoute du dirt via noise
  }

  if(paramsNoise.water.active) {
    applyWaterTiles(grid, paramsNoise.water)
  }

  if(paramsNoise.tree.active) {
    applyTreeTilesSupport(grid, paramsNoise.tree)
  }

  return grid
}
