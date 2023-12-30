<template>
  <Modal class="wa-modal" modalId="myWorksWebAppModal" modalWidth="800px">
  
    <div class="wa-modal-caption-container">
        <h3 class="wa-modal-caption">{{ isModalDataNull('title') ? props.modalData.title : '-' }}</h3>
    </div>

    <div class="wa-modal-description-container">
      <p class="wa-modal-description">{{ isModalDataNull('fullDescription') ? props.modalData.fullDescription : '-' }}</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Common/Modal.vue";

const props = defineProps({
    modalData: {
        type: Object,
        default: null,
    },
});

function isModalDataNull(key: String): boolean {
  if (props.modalData !== null) {
    return props.modalData[key] !== null ? true : false;
  }

  return false;
}

</script>
