<template>
  <main>
    <header :class="['left-side', 'side', isMenuCompact ? 'compact-nav' : 'full-nav']">
      <!-- Desktop nav -->
      <SideMenu
        class="desktop"
        v-if="isScreenSize('lg', '>=')" 
      />
      
      <!-- Mobile nav --> 
      <div v-else class="mobile-header">
        <button 
          class="burger-menu"
          @click="doMobileMenu('show')"
        >
          <Icon icon="menu" class="burger-menu-icon"/>
        </button>

        <MainLogo class=""/>
      </div>
    </header>
    <div class="right-side side">
      <router-view v-slot="{ Component }">
        <transition 
          :name="isScreenSize('lg', '>=') ? 'view-slide-left' : 'view-slide-down'" 
          mode="out-in" 
          appear
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Mobile menu -->
    <MobileMenu 
      :isActive="isMobileMenuActive"
      @closeMenu="doMobileMenu('hide')"
    />
  </main>
</template>

<script setup lang="ts">
import SideMenu from "./components/App/SideMenu.vue";
import { useRouter } from "vue-router";
import { ref, } from "vue";
import {
  getValueFromObject,
  isScreenSize,
} from "@/helpers/helpers";
import Icon from "@/components/Common/Icon.vue";
import MobileMenu from "@/components/App/MobileMenu.vue";
import MainLogo from '@/components/Common/MainLogo.vue';

const isMenuCompact = ref(false);
const isMobileMenuActive = ref(false);
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

/**
 * Show, hide or toggle mobile menu.
 */
function doMobileMenu(status: 'toggle' | 'show' | 'hide'): void {
  const actions: { [key: string]: () => void } = {
    'toggle': () => isMobileMenuActive.value = !isMobileMenuActive.value,
    'show': () => isMobileMenuActive.value = true,
    'hide': () => isMobileMenuActive.value = false,
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
