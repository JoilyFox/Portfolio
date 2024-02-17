<template>
    <span v-if="valueArray" class="flex gap-x-2">
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
        <span>
            <span
                v-for="(item, index) in valueArray"
                :key="index"
                :title="getNestedValue(item, 'tooltip', '')"
            >
                {{ getNestedValue(item, 'name') }}<span v-if="index < valueArray.length - 1"> · </span>
            </span>
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
    valueArray: {
        type: Array,
        default: null
    },
    iconTooltip: {
        type: String,
        default: ''
    }
});
</script>