<template>
    <ModalLayout :modalCaption="getNestedValue(modalData, 'title', null)">
        <Paragraph>
            In a two-person team, I led as a full-stack developer, overseeing project initiation, driving feature innovation, and ensuring quality through detailed bug fixing and staging management.
        </Paragraph>

        <Carousel :carouselData="carouselData"/>
    </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalLayout.vue";
import { getNestedValue } from "@/helpers/helpers";
import Paragraph from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalParagraph.vue";
import Carousel from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalCarousel.vue";
import { WEB_APPS_IMAGE_PATH, NO_IMAGE_PATH } from "@/config/constants";

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});

const carouselData = [
    { 
        imagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/main.jpg',
    },
    { 
        imagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/pyramid.jpg',
    },
    { 
        imagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/main.jpg',
    },
    // { 
    //     imagePath: NO_IMAGE_PATH,
    // },
    // { 
    //     imagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/pyramid.jpg',
    // },
    { 
        imagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/main.jpg',
    },
    // { 
    //     imagePath: NO_IMAGE_PATH,
    // },
]
</script>