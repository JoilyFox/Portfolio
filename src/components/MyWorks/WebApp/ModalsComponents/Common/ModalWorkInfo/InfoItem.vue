<template>
    <span v-if="value" class="flex gap-x-2">
        <Tooltip
            gap="4"
            :hoverDelay="400"
        >
            <template #target>
                <Icon 
                    v-if="icon" 
                    :icon="icon"
                    wght="600"
                    opsz="40"
                    grad="200"
                    class="text-xl cursor-default mt-[-2px]"
                />
            </template>

            <template #content>
                <span class="text-nowrap">{{ iconTooltip }}</span>
            </template>
        </Tooltip>
        <span class="flex items-center">
            {{ value }}
        </span>
    </span>
</template>

<script setup lang="ts">
import Icon from "@/components/Common/Icon.vue";
import Tooltip from "@/components/Common/Tooltip.vue";

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