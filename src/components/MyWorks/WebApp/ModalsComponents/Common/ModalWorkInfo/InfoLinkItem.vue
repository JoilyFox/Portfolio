<template>
    <span v-if="valueObject" class="flex items-center gap-x-2">
        <Icon 
            v-if="icon" 
            :icon="icon"
            wght="600"
            opsz="40"
            grad="200"
            class="text-xl cursor-default"
            :title="iconTooltip"
        />
        <a 
            class="hover-underline-thin"
            :href="getNestedValue(valueObject, 'link', '')" 
            target="_blank"
            v-if="getNestedValue(valueObject, 'link', null)"
        >
            {{ getNestedValue(valueObject, 'name') }}
        </a>
        <span v-else>
            {{ getNestedValue(valueObject, 'name') }}
        </span>
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