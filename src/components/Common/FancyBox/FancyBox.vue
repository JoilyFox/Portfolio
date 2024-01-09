<template>
    <div ref="container">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Fancybox } from "@fancyapps/ui";
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { onMounted, onUpdated, onUnmounted, ref } from 'vue';

const props = defineProps({
  	options: {
		type: Object,
		default: {}
	}
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
</script>

<style lang="scss">
body.modal-active {
	.fancybox__container {
		transform-origin: unset;
		transform: scale(0.94);
	}
}

</style>
