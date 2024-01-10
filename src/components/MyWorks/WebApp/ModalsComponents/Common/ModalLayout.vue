<template>
    <div class="sm:p-6 py-6 px-4 flex flex-col">
        <div class="wa-modal-caption-container">
            <h3 class="wa-modal-caption pr-8">
                {{ modalCaption }}
            </h3>
        </div>

        <div class="overflow-x-auto web-apps-modal-scrollbar">
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