<template>
    <div>
        <div class="wa-modal-caption-container">
            <h3 class="wa-modal-caption">{{ modalCaption }}</h3>
        </div>

        <div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    modalCaption: {
        type: String,
        default: 'Undefined'
    }
})
</script>