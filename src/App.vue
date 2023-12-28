<template>
  <main>
    <header :class="['left-side', 'side', isMenuCompact ? 'compact-nav' : 'full-nav']">
      <!-- Desktop nav -->
      <SideMenu v-if="!isScreenSize('lg')" />

      <!-- Mobile nav -->
      <transition name="slide-bottom">
        <SideMenu v-if="!isMenuCompact && isScreenSize('lg')" />
      </transition>
      <transition name="slide-right">
        <SideMenu v-if="isMenuCompact && isScreenSize('lg')" :isCompactMobile="true" />
      </transition>
    </header>
    <div class="right-side side">
      <router-view v-slot="{ Component }">
        <transition :name="!isScreenSize('lg') ? 'view-slide-left' : 'view-slide-left-mobile'" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import SideMenu from "./components/SideMenu.vue";
import { useRouter } from "vue-router";
import { ref, } from "vue";
import {
  getValueFromObject,
  isScreenSize,
} from "@/helpers/helpers";

const isMenuCompact = ref(false);
const router = useRouter();

/**
 * Adjusts the menu state based on the given status.
 */
function makeMenu(status: 'toggle' | 'compact' | 'full'): void {
  const actions: { [key: string]: () => void } = {
    'toggle': () => isMenuCompact.value = !isMenuCompact.value,
    'compact': () => isMenuCompact.value = true,
    'full': () => isMenuCompact.value = false,
  };

  getValueFromObject([status], actions, () => console.warn(`Invalid status: ${status}`))();
}

router.afterEach((to) => { 
  if (to.path.startsWith(router.resolve({ name: 'home' }).href)) {
    makeMenu('full');
  }
  
  if (to.path.startsWith(router.resolve({ name: 'myWorks' }).href)) {
    makeMenu('compact');
  }
  
  if (to.path.startsWith(router.resolve({ name: 'contacts' }).href)) {
    makeMenu('compact');
  }
});

</script>
