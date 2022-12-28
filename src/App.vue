<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import SideMenu from "./components/SideMenu.vue";
</script>

<template>

  <div class="menu-part">
    <SideMenu></SideMenu>
  </div>
  <div class="content-part">
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
</style>
