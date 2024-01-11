<template>
    <router-link
        class="main-logo"
        :to="{ name: 'home' }"
    >
        <img :src="`${IMAGE_PATH}/icons/main-logo.svg`" alt="Logo" />
    </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { IMAGE_PATH } from '@/config/constants'

</script>