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
import type { PluginsType } from '@fancyapps/ui/types/Carousel/types';

const carouselContainer = ref<HTMLElement | null>(null);
const props = defineProps({
    options: {
        type: Object,
        required: true
    },
    showThumbs: {
        type: Boolean,
        default: true
    },
    showDots: {
        type: Boolean,
        default: false
    }
});

const defaults: any = {
    Dots: props.showDots ? { dynamicFrom: 5 } : false,
    Thumbs: { type: 'modern' } as Partial<ThumbsOptionsType>,
};

let instance: Carousel | null = null;

onMounted(() => {
    if (carouselContainer.value) {
        const options: Partial<OptionsType> = { ...defaults, ...props.options };
        const plugins: PluginsType = props.showThumbs ? { Thumbs } : {};
        
        instance = new Carousel(carouselContainer.value, options, plugins);
    }
});

onUnmounted(() => {
    instance?.destroy();
});
</script>
  