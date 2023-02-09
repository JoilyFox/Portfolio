<template>
  <main>
    <header :class="['left-side', 'side', isMenuCompact ? 'compact-nav' : 'full-nav']">
      <!-- Desktop nav -->
      <SideMenu v-if="isDesktopScreen" />

      <!-- Mobile nav -->
      <transition name="slide-bottom">
        <SideMenu v-if="!isMenuCompact && !isDesktopScreen" />
      </transition>
      <transition name="slide-right">
        <SideMenu v-if="isMenuCompact && !isDesktopScreen" :isCompactMobile="true" />
      </transition>
    </header>
    <div class="right-side side">
      <router-view v-slot="{ Component }">
        <transition name="view-slide-left" mode="out-in" appear>
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import SideMenu from "./components/SideMenu.vue";
import $ from 'jquery';
import { useRouter } from "vue-router";
import { ref, } from "vue";
import { isDesktopScreen } from "@/components/helpers/helpers.ts";

let isMenuCompact = ref(false);
const router = useRouter();

router.afterEach((to) => { 
  if (to.path.startsWith(router.resolve({ name: 'home' }).href)) {
    isMenuCompact.value = false;
  }
  
  if (to.path.startsWith(router.resolve({ name: 'myWorks' }).href)) {
    isMenuCompact.value = true;
  }
  
  if (to.path.startsWith(router.resolve({ name: 'contacts' }).href)) {
    isMenuCompact.value = true;
  }
});

</script>
