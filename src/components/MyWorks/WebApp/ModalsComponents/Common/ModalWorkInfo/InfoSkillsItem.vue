<template>
    <span v-if="valueArray" class="flex items-center gap-x-2">
        <Icon 
            v-if="icon" 
            :icon="icon"
            wght="600"
            opsz="40"
            grad="200"
            class="text-xl cursor-default"
            :title="iconTooltip"
        />
        <div>
            <span 
                v-for="(item, index) in valueArray"
                :key="index"
                :title="getNestedValue(item, 'tooltip', '')"
            >
                {{ getNestedValue(item, 'name') }}<span v-if="index < valueArray.length - 1"> · </span>
            </span>
        </div>
    </span>
</template>

<script setup lang="ts">
import Icon from "@/components/Common/Icon.vue";
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