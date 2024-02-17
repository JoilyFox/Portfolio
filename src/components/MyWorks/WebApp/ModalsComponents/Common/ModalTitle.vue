<template>
    <h3 class="caption-dark-color text-lg tracking-wide font-bold" :class="[marginTop]">
        <slot />
    </h3>
</template>

<script setup lang="ts">
defineProps({
    marginTop: {
        type: String,
        default: 'mt-4'
    },
});
</script>