<template>
    <p class="paragraph-dark-color md:pr-2" :class="[marginTop]">
        <slot />
    </p>
</template>

<script setup lang="ts">
defineProps({
    marginTop: {
        type: String,
        default: 'mt-1'
    },
});
</script>