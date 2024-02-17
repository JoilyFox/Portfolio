<template>
    <div class="caption-medium-dark-color font-medium flex flex-col gap-y-2 mt-1">
        <!-- Development duration -->
        <InfoItem
            icon="calendar_month"
            :value="developmentDuration"
            iconTooltip="Development duration"
        />
            
        <!-- Client name -->
        <InfoLinkItem
            icon="person"
            :valueObject="companyName"
            iconTooltip="Client name"
        />

        <!-- Role -->
        <InfoItem
            icon="badge"
            :value="role"
            iconTooltip="Role"
        />

        <!-- Skills -->
        <InfoSkillsItem
            icon="code"
            :valueArray="skills"
            iconTooltip="Development technologies"
        />
    </div>
</template>

<script setup lang="ts">
import InfoItem from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalWorkInfo/InfoItem.vue";
import InfoLinkItem from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalWorkInfo/InfoLinkItem.vue";
import InfoSkillsItem from "@/components/MyWorks/WebApp/ModalsComponents/Common/ModalWorkInfo/InfoSkillsItem.vue";
import { getNestedValue } from "@/helpers/helpers";

defineProps({
    developmentDuration: {
        type: String,
        default: null
    },
    companyName: {
        type: Object,
        default: null
    },
    role: {
        type: String,
        default: null
    },
    skills: {
        type: Array,
        default: null
    },
});
</script>