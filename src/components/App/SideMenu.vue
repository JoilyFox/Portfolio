<template>
    <nav class="main-nav nav" :class="{'compactMobile': isCompactMobile}">  
      <MainLogo class="main-nav-item"/>
      <router-link 
        class="main-nav-item" 
        :to="{ name: 'home' }"
      >
        Home
      </router-link>
      <router-link
        class="main-nav-item"
        :to="{ name: 'myWorks' }"
      >
        My works
      </router-link>
      <router-link
        class="main-nav-item"
        :to="{ name: 'contacts' }"
      >
        Contacts
      </router-link>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MainLogo from '@/components/Common/MainLogo.vue';

defineProps({
  isCompactMobile: {
    type: Boolean,
    default: false,
  },
})
</script>
