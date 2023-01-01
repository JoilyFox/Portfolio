<template>
  <main>
    <div :class="['left-side', 'side', isMenuCompact ? 'compact-nav' : 'full-nav']">
      <SideMenu @changeMenuForm="changeMenuForm"></SideMenu>
    </div>
    <div class="right-side side">
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import SideMenu from "./components/SideMenu.vue";
  import { RouterLink, RouterView } from "vue-router";
  import { ref } from "@vue/reactivity";

  let isMenuCompact = ref(false);

  function changeMenuForm(val: boolean) {
    isMenuCompact.value = val;
  }


</script>
