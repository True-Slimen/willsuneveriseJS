<script setup lang="ts">
import {ref, reactive} from "vue";
import WorldGenerator from "@/components/tabs/WorldGenerator.vue";

const menuLinks: string[] = reactive([
  {
    icon: "icon-world",
    title: "Créer carte",
    components: "world",
  },
  {
    icon: "icon-slide",
    title: "Réglages",
    components: "settings",
  },
])
let selectedLinks: string | null = ref(null);

function select(index) {
  if(selectedLinks.value != menuLinks[index]) {
   return selectedLinks.value = menuLinks[index];
  }
  selectedLinks.value = null;
}
</script>

<template>
  <div class="nav-left bg-gray-900" :class="`${selectedLinks ? 'nav-left-open' : ''}`">
    <ul class="link-list">
      <li
          v-for="(links, index) in menuLinks"
          class="bg-gray-700 text-stone-200"
          :class="`${selectedLinks == menuLinks[index] ? 'link-list-open bg-gray-900' : ''}`"
          @click="select(index)"
      >
        <span :class="`icon ${links.icon} text-xl text-stone-200`"></span>
      </li>
    </ul>
    <div class="content">
      <WorldGenerator class="world-generator" v-if="selectedLinks?.components === 'world'"></WorldGenerator>
    </div>
  </div>
</template>

<style lang="scss">
.nav-left {
  position: absolute;
  left: 0;
  width: 340px;
  transform: translateX(-100%);
  height: 100dvh;
  z-index: 10;
  margin-top: -62px;
  padding: 90px 12px 25px 12px;
  transition: all 0.2s ease;
}

.nav-left-open {
  transform: translateX(0);
  transition: all 0.2s ease;
}

.link-list {
  position: absolute;
  right: 0;
  transform: translateX(100%);
  li {
    line-height: 35px;
    cursor: pointer;
    height: 35px;
    width: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin: 10px 0;
    transition: all 0.2s ease;
  }

  .link-list-open {
    width: 45px;
    transition: all 0.2s ease;
  }
}

.content {
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
}

.world-generator {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
