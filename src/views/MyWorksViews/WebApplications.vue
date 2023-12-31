<template>
  <div class="web-apps-gallery-container hover-gallery-container">
    <div 
      class="web-apps-gallery-item hover-gallery-item" 
      v-for="item in webAppsData"
      @click="modalData = item"
    >

      <a 
        class="gallery-item-image-link"
        open-modal="myWorksWebAppModal"
      >
        <img 
          class="gallery-item-img lazy-image"
          v-lazy="{ 
            src: getNestedValue(item, 'mainImagePath', NO_IMAGE_PATH), 
            loading: IMAGE_PATH + '/lazy-load/lazy-load_loading.svg', 
            error: NO_IMAGE_PATH, 
            delay: 200 
          }"
        >
      </a>

      <div class="hover-gallery-item-picture-text">
        <span class="gallery-item-caption hover-underline-thin" open-modal="myWorksWebAppModal"> 
          {{ getNestedValue(item, 'title') }}
        </span>
        <p class="gallery-item-description">
          {{ item.description }}
        </p>
        <div class="gallery-item-tags">
          <span class="gallery-item-tags-item hover-underline-thin" v-for="tag in getNestedValue(item, 'tags', [])">
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
import { webAppsData, tags } from "@/data/portfolioData";
import { IMAGE_PATH, WEB_APPS_IMAGE_PATH, NO_IMAGE_PATH } from "@/config/constants";
import { Fancybox } from "@fancyapps/ui";
import WebAppModal from "@/components/MyWorks/WebApp/Modal.vue";
import { shallowRef } from "@vue/reactivity";
import { getNestedValue } from "@/helpers/helpers";

const modalData = shallowRef({});

</script>
