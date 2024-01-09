<template>
    <div class="sm:p-6 py-6 px-4">
        <div class="wa-modal-caption-container">
            <h3 class="wa-modal-caption pr-6">
                {{ modalCaption }}
            </h3>
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