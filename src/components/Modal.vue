<template>
    <div class="modal" :id="props.modalId">
        <div class="modal-centerer">
            <div class="modal-body" :style="`width: ${props.modalWidth}`">
                <div class="modal-wrapper">
                    <slot/>
                </div>
            </div>
        </div>
        <div class="modal-background close-modal"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';

const props = defineProps({
    modalId: {
        type: String,
        required: true,
    },
    modalWidth: {
        type: String,
        default: '400px',
    }
});

onMounted(() => {
    const modal = document.getElementById(props.modalId);
    const openModalBtns = document.querySelectorAll(`[open-modal="${props.modalId}"]`);
    const body = document.body;

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal?.classList.add('active');
            body.classList.add('modal-active');
        });
    });

    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal?.classList.add('out');

            setTimeout(() => {
                modal?.classList.remove('out');
                modal?.classList.remove('active');
            }, 300);

            body.classList.remove('modal-active');
        });
    });
});

    
</script>