<template>
    <span 
        class="inline-flex cursor-pointer h-[1em] w-5" 
        :class="[additionalClasses, gap]"
        tooltipAlign="middle"
    >
        <Tooltip
            gap="24"
            :hoverDelay="400"
            additionalTargetClasses="inline-flex items-center"
        >
            <template #target>
                <Icon 
                    wght="500"
                    opsz="48"
                    icon="image_search"
                    class="absolute px-1 opacity-70 ml-[-4px] mb-[-6px] active:opacity-100 md:hover:opacity-100 transition-all"
                    :class="[color, iconSize]"
                />
            </template>

            <template #content>
                <span class="text-nowrap">Click to see on screenshot!</span>
            </template>
        </Tooltip>
    </span>
</template>

<script setup lang="ts">
import Icon from "@/components/Common/Icon.vue";
import Tooltip from "@/components/Common/Tooltip.vue";

defineProps({
    color: {
        type: String,
        default: 'caption-dark-color'
    },
    iconSize: {
        type: String,
        default: 'text-xl'
    },
    additionalClasses: {
        type: String,
        default: ''
    },
    gap: {
        type: String,
        default: 'ml-[2px]'
    },
});
</script>