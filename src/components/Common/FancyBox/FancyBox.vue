<template>
    <div ref="container">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Fancybox } from "@fancyapps/ui";
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { onMounted, onUpdated, onUnmounted, ref, getCurrentInstance  } from 'vue';
import type { ModalCarouselItem } from '@/types/components/modalCarousele';

const props = defineProps({
  	options: {
		type: Object,
		default: {}
	},
	data: {
		type: Array as PropType<ModalCarouselItem[]>,
		default: []
	},
});

const container = ref(null);

onMounted(() => {
	if (container.value) {
		Fancybox.bind(container.value, '[data-fancybox]', {
			...props.options
		});
	}
});

onUpdated(() => {
	if (container.value) {
		Fancybox.unbind(container.value);
		Fancybox.close();

		Fancybox.bind(container.value, '[data-fancybox]', {
			...props.options
		});
	}
});

onUnmounted(() => {
  	Fancybox.destroy();
});

// Function to open a specific slide
function openFancyBoxSlide(id: string): void {
    const index = props.data.findIndex((item: ModalCarouselItem) => item.id === id);
    if (index !== -1) {
        Fancybox.show(
            props.data.map((item: ModalCarouselItem) => ({ src: item.imagePath, opts: { caption: item.caption || '' } })),
            {
                startIndex: index,
            }
        );
    }
}

defineExpose({ openFancyBoxSlide });
</script>

<style lang="scss">
body.modal-active {
	.fancybox__container {
		transform-origin: unset;
		transform: scale(0.94);
	}
}

</style>
