<template>
    <nav class="main-nav nav" :class="{'compactMobile': isCompactMobile}">  
      <router-link
        class="main-nav-item logo"
        :to="{ name: 'home' }"
      >
        <img src="@/assets/img/icons/main-logo.svg" alt="Logo" />
      </router-link>
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

  defineProps({
    isCompactMobile: {
      type: Boolean,
      default: false,
    },
  })
</script>
