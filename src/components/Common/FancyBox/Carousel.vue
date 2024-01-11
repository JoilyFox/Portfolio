<template>
    <div ref="carouselContainer" class="f-carousel">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Carousel } from '@fancyapps/ui';
import type { OptionsType, ThumbsOptionsType } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

const carouselContainer = ref<HTMLElement | null>(null);
const props = defineProps({
    options: {
        type: Object,
        required: true
    },
});

const defaults: any = {
    Dots: false,
    Thumbs: { type: 'modern' } as Partial<ThumbsOptionsType>,
};

let instance: Carousel | null = null;

onMounted(() => {
    if (carouselContainer.value) {
        const options: Partial<OptionsType> = { ...defaults, ...props.options };
        instance = new Carousel(carouselContainer.value, options, { Thumbs });
    }
});

onUnmounted(() => {
    instance?.destroy();
});
</script>
  