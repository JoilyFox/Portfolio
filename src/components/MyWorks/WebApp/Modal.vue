<template>
	<Modal
		:show="isActive"
		width="4xl"
		additionalBodyClasses="wa-modal"
		:transitionDuration="MODAL_TRANSITION_DURATION"
	>
		<div>
			<component 
				:is="getNestedValue(modalData, 'contentComponent', FallbackComponent)"
				:modalData="modalData"
			/>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Common/Modal.vue";
import FallbackComponent from "@/components/MyWorks/WebApp/ModalsComponents/FallbackComponent.vue";
import { getNestedValue } from "@/helpers/helpers";
import { MODAL_TRANSITION_DURATION } from "@/config/components/webAppModalConstants";

defineProps({
	isActive: {
        type: Boolean,
        default: false,
	},
    modalData: {
        type: Object,
        default: {},
    },
});

</script>