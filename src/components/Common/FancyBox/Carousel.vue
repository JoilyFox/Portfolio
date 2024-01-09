<template>
    <div ref="carouselContainer" class="f-carousel">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

const carouselContainer = ref(null);
const props = defineProps({
    options: Object,
});

const defaults = {
    Dots: false,
    Thumbs: { type: 'modern' },
};

let instance;

onMounted(() => {
    const options = { ...defaults, ...props.options };
    instance = new Carousel(carouselContainer.value, options, { Thumbs });
});

onUnmounted(() => {
    instance.destroy();
});
</script>
  