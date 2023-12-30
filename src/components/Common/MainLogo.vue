<template>
    <router-link
        class="main-logo"
        :to="{ name: 'home' }"
    >
        <img src="@/assets/img/icons/main-logo.svg" alt="Logo" />
    </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>