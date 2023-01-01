<template>
  <nav class="main-nav nav">
      <router-link class="main-nav-item logo" to="/" @click="changeMenuForm(false)">
        <img src="@/assets/scss/img/main-logo.svg" alt="Logo">
      </router-link>
      <router-link class="main-nav-item" to="/" @click="changeMenuForm(false)">
        Home
      </router-link>
      <router-link class="main-nav-item" to="/my-works" @click="changeMenuForm(true)">
        My works
      </router-link>
      <router-link class="main-nav-item" to="/collage" @click="changeMenuForm(true)">
        Collage
      </router-link>
      <router-link class="main-nav-item" to="/contacts" @click="changeMenuForm(true)">
        Contacts
      </router-link>
  </nav>
</template>

<script setup lang="ts">
  import { toRefs } from "vue";
  
  const emits = defineEmits(['changeMenuForm']);

  function changeMenuForm(val: Boolean) {
    emits('changeMenuForm', val);
  }
  
</script>
