<template>
    <span v-if="value" class="flex items-center gap-x-2">
        <Icon 
            v-if="icon" 
            :icon="icon"
            wght="600"
            opsz="40"
            grad="200"
            class="text-xl cursor-default"
            :title="iconTooltip"
        />
        {{ value }}
    </span>
</template>

<script setup lang="ts">
import Icon from "@/components/Common/Icon.vue";

defineProps({
    icon: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: null
    },
    iconTooltip: {
        type: String,
        default: ''
    }
})
</script>