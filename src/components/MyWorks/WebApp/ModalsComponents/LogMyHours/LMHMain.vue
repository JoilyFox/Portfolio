<template>
    <ModalLayout :modalCaption="getNestedValue(modalData, 'title', null)">
        <ModalParagraph>
            In a two-person team, I led as a full-stack developer, overseeing project initiation, driving feature innovation, and ensuring quality through detailed bug fixing and staging management.
        </ModalParagraph>
    </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalLayout.vue";
import { getNestedValue } from "@/helpers/helpers";
import ModalParagraph from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalParagraph.vue";

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});
</script>