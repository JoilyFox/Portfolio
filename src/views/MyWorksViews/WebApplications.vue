<template>
  <div class="web-apps-gallery-container hover-gallery-container">
    <div 
      class="web-apps-gallery-item hover-gallery-item" 
      v-for="item in websiteProjectsData"
      @click="modalData = item"
    >

      <a 
        class="gallery-item-image-link"
        open-modal="myWorksWebAppModal"
      >
        <img 
          class="gallery-item-img lazy-image"
          v-lazy="{ 
            src: WEB_APPS_IMAGE_PATH + item.slug + '/' + HEADER_IMAGE_NAME, 
            loading: IMAGE_PATH + '/lazy-load/lazy-load_loading.svg', 
            error: 'your error image url', 
            delay: 200 
          }"
        >
      </a>

      <div class="hover-gallery-item-picture-text">
        <span class="gallery-item-caption hover-underline-thin" open-modal="myWorksWebAppModal"> 
          {{ item.title }}
        </span>
        <p class="gallery-item-description">
          {{ item.description }}
        </p>
        <div class="gallery-item-tags">
          <span class="gallery-item-tags-item hover-underline-thin" v-for="tag in item.tags">
            #{{ tags[tag] }}
          </span>
        </div>  
      </div>
    </div>

    <!-- Modal -->
    <WebAppModal :modalData="modalData" />

  </div>
</template>

<script setup lang="ts">
import { websiteProjectsData, tags } from "@/data/portfolioData";
import { IMAGE_PATH, WEB_APPS_IMAGE_PATH, HEADER_IMAGE_NAME } from "@/config/constants";
import { Fancybox } from "@fancyapps/ui";
import WebAppModal from "@/components/MyWorks/WebAppModal.vue";
import { ref } from "@vue/reactivity";

const modalData = ref(null);

</script>
