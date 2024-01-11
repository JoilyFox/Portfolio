<template>
    <ModalLayout :modalCaption="getNestedValue(modalData, 'title', 'Undefined')">
        <Info 
            developmentDuration="Mar 2023 - Dec 2023 · 10 mos"
            :companyName="{ name: 'wwwest.solutions', link: 'https://wwwest.solutions/' }"
            :skills="skills"
        />

        <Paragraph>
            In a two-person team, I led as a full-stack developer, overseeing project initiation, driving feature innovation, and ensuring quality through detailed bug fixing and staging management.
        </Paragraph>

        <Carousel :carouselData="carouselData"/>
    </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalLayout.vue";
import { getNestedValue, getImageUrl } from "@/helpers/helpers";
import Paragraph from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalParagraph.vue";
import Carousel from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalCarousel.vue";
import Info from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalWorkInfo/ModalWorkInfo.vue";
import { WEB_APPS_IMAGE_PATH, NO_IMAGE_PATH } from "@/config/constants";
import { SKILLS } from "@/data/portfolioData";

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});

const carouselData = [
    { 
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/main.jpg`),
    },
    { 
        imagePath: getImageUrl(`${NO_IMAGE_PATH}`)
    },
    { 
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/pyramid.jpg`),
    },
    { 
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/main.jpg`),
    },
    { 
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/pyramid.jpg`),
    },
    { 
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/main.jpg`),
    },
    { 
        imagePath: getImageUrl(`${NO_IMAGE_PATH}`)
    },
];

const skills = [ SKILLS['laravel'], SKILLS['vue'], SKILLS['inertia'], SKILLS['laravel_nova'], SKILLS['tailwind'], SKILLS['docker'], SKILLS['scss'], SKILLS['gitlab']]
</script>