<template>
  <main>
    <div class="transition-container"></div>
    <div :class="['left-side', 'side', isMenuCompact ? 'compact-nav' : 'full-nav']">
      <!-- Desktop nav -->
      <SideMenu v-if="isDesktopScreen"></SideMenu>

      <!-- Mobile nav -->
      <transition name="slide-bottom">
        <SideMenu v-if="!isMenuCompact && !isDesktopScreen"></SideMenu>
      </transition>
      <transition name="slide-right">
        <SideMenu v-if="isMenuCompact && !isDesktopScreen" :isCompactMobile="true"></SideMenu>
      </transition>
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

  import $ from 'jquery';
  import { useRouter } from "vue-router";
  import { ref } from "vue";

  let isMenuCompact = ref(false);
  const router = useRouter();

  router.afterEach((to) => { 
    switch (to.path) {
      case '/':
        isMenuCompact.value = false;
        break;
      case '/my-works':
        isMenuCompact.value = true;
        break;
      case '/contacts':
        isMenuCompact.value = true;
        break;
    }
  });

  //Rewrite this in helper!!!
  const isDesktopScreen = ref(checkIsDesktopScreen());

  window.addEventListener('resize', () => { 
    isDesktopScreen.value = checkIsDesktopScreen() 
  });

  function checkIsDesktopScreen() {
    return window.innerWidth > 1023 
  }


</script>
