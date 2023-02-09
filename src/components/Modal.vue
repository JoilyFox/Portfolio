<template>
    <div class="modal-container" :id="props.modalId">
        <div class="modal-background">
            <div class="modal">
                <!-- <slot name="modal-content"></slot> -->
            </div>
        </div>
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
});

onMounted(() => {
    const modal = $('#' + props.modalId);
    const openModalBtn = $(`[open-modal="${props.modalId}"]`);
    const modalBackground = $('.modal-background');
    

    openModalBtn.click(() => {
        console.log(modal)

        modal.addClass('two');
        $('body').addClass('modal-active');
    });

    modalBackground.click(function(){
        modal.addClass('out');

        setTimeout(() => {
            modal.removeClass('out');
            modal.removeClass('two');
        }, 300);
        $('body').removeClass('modal-active');
    });
})



// $('.modalOpen').click(function(){
//   var buttonId = $(this).attr('id');
//   $(modalId).removeAttr('class').addClass('two');
//   $('body').addClass('modal-active');
// })

// $(modalId).click(function(){
//   $(this).addClass('out');
//   $('body').removeClass('modal-active');
// });

    
</script>