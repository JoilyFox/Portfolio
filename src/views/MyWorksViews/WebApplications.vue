<template>
  <div class="web-apps-gallery-container hover-gallery-container">
    <div class="web-apps-gallery-item hover-gallery-item" v-for="item in websiteProjectsData">
    
      <a class="gallery-item-image-link" data-fancybox="web-app-gallery" :href="WEB_APPS_IMAGE_PATH + item.slug + '/' + HEADER_IMAGE_NAME">
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
        <span class="gallery-item-caption hover-underline-thin">
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

  <Modal modalId="modalTest"></Modal>
  <button open-modal="modalTest">fdasgdsfgaedgf</button>
  </div>
</template>

<script setup lang="ts">
import { websiteProjectsData, tags } from "@/components/helpers/portfolioData";
import { IMAGE_PATH, WEB_APPS_IMAGE_PATH, HEADER_IMAGE_NAME } from "@/components/helpers/constants";
import $ from 'jquery';
import { Fancybox } from "@fancyapps/ui";
import Modal from "@/components/Modal.vue";

Fancybox.bind('[data-fancybox="web-app-gallery"]', {
  Toolbar: false,
  closeButton: "top",

  Image: {
    zoom: false,
  },

  on: {
    initCarousel: (fancybox) => {
      const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

      fancybox.$container.style.setProperty(
        "--bg-image",
        `url("${slide.$thumb.src}")`
      );
    },
    "Carousel.change": (fancybox, carousel, to, from) => {
      const slide = carousel.slides[to];

      fancybox.$container.style.setProperty(
        "--bg-image",
        `url("${slide.$thumb.src}")`
      );
    },
  },
});


</script>
