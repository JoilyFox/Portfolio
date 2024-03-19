<template>
    <ModalLayout :modalCaption="getNestedValue(modalData, 'title', 'Undefined')">
        <Info 
            developmentDuration="Mar 2023 - Dec 2023 · 10 mos"
            :companyName="{ name: 'wwwest.solutions', link: 'https://wwwest.solutions/' }"
            role="Full Stack Developer & Team Lead"
            :skills="skills"
        />

        <Title>
            My Responsibilities:
        </Title>

        <ListWrapper>
            <ListItem>
                Led the development team, managing project and stage environments.
            </ListItem>
            <ListItem>
                Spearheaded backend development, and contributed significantly to project architecture.
            </ListItem>
            <ListItem>
                Actively participated in feature proposal discussions, implementation, and bug fixes.
            </ListItem>
        </ListWrapper>

        <Title>
            Project Overview:
        </Title>

        <Paragraph>
            Log My Hours is a time-tracking website designed to optimize task management. Its core features include:
        </Paragraph>

        <ListWrapper>
            <ListItem marginTop="mt-[6px]">
                <Bold>Time Tracking Calendar:</Bold> Employees can log time spent on tasks and describe their work, enhancing project management efficiency.
                <ShowSlideBtn @click="modalCarousel_1?.openFancyBoxSlide('month_week_user_calendar_view')" />
            </ListItem>
            <ListItem>
                <Bold>Request Forms:</Bold> Integrated forms for various requests like sick leave, vacations, and feedback, streamlining administrative processes.
                <ShowSlideBtn @click="modalCarousel_1?.openFancyBoxSlide('user_requests')" />
            </ListItem>
            <ListItem>
                <Bold>User Profile:</Bold> Each user has a personal profile to track their data, project assignments, holiday/sick leave requests, and other.
                <ShowSlideBtn @click="modalCarousel_1?.openFancyBoxSlide('profile')" />
            </ListItem>
            <ListItem>
                <Bold>Admin Workspace:</Bold> Features a calendar with advanced options for time record management and a Laravel Nova-based admin panel for comprehensive application entity management.
                <ShowSlideBtn @click="modalCarousel_1?.openFancyBoxSlide('laravel_nova_users_table')" />
            </ListItem>
        </ListWrapper>

        <Paragraph marginTop="mt-4">
            There some screenshots from this application:
        </Paragraph>

        <Carousel ref="modalCarousel_1" :data="carouselData" marginTop="mt-2"/>

        <ListWrapper>
            <ListItem marginTop="mt-[6px]">
                <Bold>Report Generation:</Bold> Admins can generate comprehensive reports, with filters for time period, projects, users, and clients. These reports, detailing work hours and financial commitments, can be viewed or exported as PDFs or tables.
            </ListItem>
        </ListWrapper>
    </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalLayout.vue";
import Title from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalTitle.vue";
import Paragraph from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalParagraph.vue";
import Carousel from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalCarousel.vue";
import Info from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalWorkInfo/ModalWorkInfo.vue";
import ListWrapper from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalList/ListWrapper.vue";
import ListItem from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalList/ListItem.vue";
import Bold from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalBold.vue";
import ShowSlideBtn from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalShowSlideBtn.vue";

import { ref } from "vue";
import { getNestedValue, getImageUrl } from "@/helpers/helpers";
import { WEB_APPS_IMAGE_PATH } from "@/config/constants";
import { SKILLS } from "@/data/portfolioData";

import type { ModalCarouselItem, ModalCarouse } from '@/types/components/modalCarousele';

defineProps({
    modalData: {
        type: Object,
        default: {},
    },
});

const modalCarousel_1 = ref<ModalCarouse | null>(null);

const carouselData: ModalCarouselItem[] = [
    {
        id: 'month_week_user_calendar_view',
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/carousel/month_week_user_calendar_view.jpg`),
        caption: 'Calendar page featuring month/week view where users can log their time or manage it.'
    },
    {
        id: 'user_requests',
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/carousel/user_requests.jpg`),
        caption: 'Forms where the user can request vacation, sick leave, project, etc.'
    },
    {
        id: 'profile',
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/carousel/profile.jpg`),
        caption: 'A user profile page with general information about him and a table with the status of holiday requests.'
    },
    {
        id: 'laravel_nova_users_table',
        imagePath: getImageUrl(`${WEB_APPS_IMAGE_PATH}/log-my-hours/carousel/laravel_nova_users_table.jpg`),
        caption: 'A panel where the administrator can manage all the main application entities.'
    },
];

const skills = [ SKILLS['laravel'], SKILLS['vue'], SKILLS['inertia'], SKILLS['laravel_nova'], SKILLS['tailwind'], SKILLS['docker'], SKILLS['scss'], SKILLS['gitlab']]
</script>