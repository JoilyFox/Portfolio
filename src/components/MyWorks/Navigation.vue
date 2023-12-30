<template>
  <nav class="my-works-nav hover-underline-bold">
    <router-link 
      class="my-works-nav-item" 
      :to="{ name: 'webApplications' }"
    >
      Web Apps
    </router-link>
    <router-link 
      class="my-works-nav-item" 
      :to="{ name: 'artworks' }"
    >
      Artworks
    </router-link>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'

</script>
