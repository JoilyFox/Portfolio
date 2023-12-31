<template>
    <ModalLayout :modalCaption="getNestedValue(modalData, 'title', null)">
        LMH
        text
        text
    </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalLayout.vue";
import { getNestedValue } from "@/helpers/helpers";

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});
</script>