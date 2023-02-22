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
import $ from 'jquery';

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
    const modal = $('#' + props.modalId);
    const openModalBtn = $(`[open-modal="${props.modalId}"]`);
    const body = $('body');

    openModalBtn.click(() => {
        modal.addClass('active');
        body.addClass('modal-active');
    });

    $('.close-modal').click(function(){
        modal.addClass('out');

        setTimeout(() => {
            modal.removeClass('out');
            modal.removeClass('active');
        }, 300);

        body.removeClass('modal-active');
    });
})

    
</script>