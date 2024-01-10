<template>
    <div class="text-[#676767] font-medium flex flex-col gap-y-2 mb-4">
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

        <!-- Skills -->
        <InfoSkillsItem
            icon="lightbulb"
            :valueArray="skills"
            iconTooltip="Skills"
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
    skills: {
        type: Array,
        default: null
    },
})
</script>