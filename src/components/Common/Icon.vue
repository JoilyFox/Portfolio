<template>
    <span
        class="material-symbols-outlined"
        :style="[symbolStyles]"
    >
        {{icon}}
   </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    fill: {
        type: String,
        default: '0'
    },
    wght: {
        type: String,
        default: '300'
    },
    grad: {
        type: String,
        default: '0'
    },
    opsz: {
        type: String,
        default: '48'
    }
});

const symbolStyles = computed(() => ({
    'font-variation-settings': `'FILL' ${ props.fill }, 'wght' ${ props.wght }, 'GRAD' ${ props.grad }, 'opsz' ${ props.opsz }`,
}));
</script>



