<template>
	<Modal class="wa-modal" modalId="myWorksWebAppModal" modalWidth="800px">
		<component 
			:is="getNestedValue(modalData, 'contentComponent', FallbackComponent)"
			:modalData="modalData"
		/>
	</Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Common/Modal.vue";
import FallbackComponent from "@/components/MyWorks/WebApp/ModalsComponents/FallbackComponent.vue";
import { getNestedValue } from "@/helpers/helpers";

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});

</script>