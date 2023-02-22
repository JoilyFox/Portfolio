<template>
  <div>
    artworks
    <!-- <a class="gallery-item-image-link" data-fancybox="web-app-gallery" :href="WEB_APPS_IMAGE_PATH + item.slug + '/' + HEADER_IMAGE_NAME">
        <img 
          class="gallery-item-img lazy-image"
          v-lazy="{ 
            src: WEB_APPS_IMAGE_PATH + item.slug + '/' + HEADER_IMAGE_NAME, 
            loading: IMAGE_PATH + '/lazy-load/lazy-load_loading.svg', 
            error: 'your error image url', 
            delay: 200 
          }"
        >
      </a> -->
  </div>
</template>

<script setup lang="ts">
import { Fancybox } from "@fancyapps/ui";

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
