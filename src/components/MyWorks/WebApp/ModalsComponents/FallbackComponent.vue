<template>
    <ModalLayout modalCaption="Undefined component">
        ...
    </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalLayout.vue";

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});
</script>