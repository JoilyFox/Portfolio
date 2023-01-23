<template>
  <section class="my-works">
    <div class="container">
      <MyWorksCaption description="Discover my web development creations." />
      <MyWorksNavigation />

      <!-- <router-view v-slot="{ Component }">
        <transition name="view-slide-right" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view> -->

      <router-view v-slot="{ Component }">
        <transition name="view-slide-right" mode="out-in" appear>
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
  import MyWorksCaption from "@/components/MyWorksCaption.vue";
  import MyWorksNavigation from "@/components/MyWorksNavigation.vue";

</script>
