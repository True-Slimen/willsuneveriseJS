<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  title: String,
})

let collapseState = ref(false);
</script>

<template>
  <div :class="`form-group border border-1 border-slate-600 rounded p-2 collapse-custom${collapseState ? '--open' : ''}`">
    <h5 @click="collapseState = !collapseState" class="cursor-pointer text-center text-md font-medium text-slate-400">{{ props.title }}</h5>
    <slot>Empty</slot>
  </div>
</template>

<style>
.collapse-custom {
  width: 100%;
  height: 39px;
  overflow: hidden;
  transition: all 0.25s ease;
}

.--open {
  height: fit-content;
  overflow: hidden;
  transition: all 0.25s ease;
}

</style>
