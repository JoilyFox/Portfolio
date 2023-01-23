<template>
  <div class="web-apps-gallery-container hover-gallery-container">
    <div class="web-apps-gallery-item hover-gallery-item" v-for="item in websiteProjectsData">
      <img class="gallery-item-img" :src="WEB_APPS_IMAGE_PATH + item.slug + '/' + HEADER_IMAGE_NAME" alt="">

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
  </div>
</template>

<script setup lang="ts">
import { websiteProjectsData, tags } from "@/components/helpers/portfolioData";
import { WEB_APPS_IMAGE_PATH, HEADER_IMAGE_NAME } from "@/components/helpers/constants";

</script>
