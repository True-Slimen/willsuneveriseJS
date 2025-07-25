<script setup lang="ts">
import MapManager from "@/components/MapManager.vue";
import Nav from "@/components/layouts/nav.vue";

</script>

<template>
  <div class="app-wrapper">
    <Nav></Nav>
    <MapManager></MapManager>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
