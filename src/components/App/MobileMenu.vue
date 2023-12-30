<template>
    <transition name="mobile-menu">
        <div 
            v-if="isActive" 
            class="mobile-menu"
            @click="emit('closeMenu')"
        >
            <button class="close-button">
                <Icon icon="close"/>
            </button>
            <div class="nav-wrapper">
                <SideMenu />
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import SideMenu from '@/components/App/SideMenu.vue';
import Icon from "@/components/Common/Icon.vue";

defineProps({
    isActive: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(['closeMenu']);
</script>