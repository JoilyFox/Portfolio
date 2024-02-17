<template>
    <span v-if="valueObject" class="flex gap-x-2">
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
        <a 
            class="hover-underline-thin flex items-center"
            :href="getNestedValue(valueObject, 'link', '')" 
            target="_blank"
            v-if="getNestedValue(valueObject, 'link', null)"
        >
            {{ getNestedValue(valueObject, 'name') }}
        </a>
        <span v-else class="flex items-center">
            {{ getNestedValue(valueObject, 'name') }}
        </span>
    </span>
</template>

<script setup lang="ts">
import Icon from "@/components/Common/Icon.vue";
import Tooltip from "@/components/Common/Tooltip.vue";
import { getNestedValue } from "@/helpers/helpers";

defineProps({
    icon: {
        type: String,
        default: ''
    },
    valueObject: {
        type: Object,
        default: null
    },
    iconTooltip: {
        type: String,
        default: ''
    }
})
</script>