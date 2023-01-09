<template>
    <nav class="main-nav nav" :class="{'compactMobile': isCompactMobile}">  
      <router-link
        class="main-nav-item logo"
        to="/"
      >
        <img src="@/assets/scss/img/main-logo.svg" alt="Logo" />
      </router-link>
      <router-link class="main-nav-item" to="/">
        Home
      </router-link>
      <router-link
        class="main-nav-item"
        to="/my-works"
      >
        My works
      </router-link>
      <router-link
        class="main-nav-item"
        to="/contacts"
      >
        Contacts
      </router-link>
    </nav>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

defineProps({
  isCompactMobile: {
    type: Boolean,
    default: false,
  },
})
</script>
