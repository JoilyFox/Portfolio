<template>
  <div class="section-name-container">
    <h1 class="section-name-caption">My Works</h1>
    <p class="section-name-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">

defineProps({
  description: {
    type: String,
    default: '',
  },
})

</script>
