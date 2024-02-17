<template>
    <li class="pl-4 relative" :class="[marginTop]">
        <span class="absolute inset-y-0 left-0 flex">
            <Icon 
                icon="fiber_manual_record" 
                fill="1"
                class="absolute text-[10px] top-[7px] left-0 caption-dark-color"
            />
        </span>

        <span class="paragraph-dark-color">
            <slot />
        </span>
    </li>
</template>

<script setup lang="ts">
import Icon from "@/components/Common/Icon.vue";

defineProps({
    marginTop: {
        type: String,
        default: 'mt-1'
    },
});
</script>