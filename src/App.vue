<script setup lang="ts">
import MapManager from "@/components/MapManager.vue";
import Nav from "@/components/layouts/nav.vue";
import NavLeft from "@/components/layouts/navLeft.vue";

</script>

<template>
  <div class="app-wrapper bg-zinc-800">
    <Nav></Nav>
    <NavLeft></NavLeft>
    <MapManager></MapManager>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
</style>
