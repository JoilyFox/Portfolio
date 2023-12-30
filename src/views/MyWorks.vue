<template>
  <section class="my-works">
    <div class="container">
      <Caption description="Discover my web development creations." />
      <Navigation />
      
      <router-view v-slot="{ Component }">
        <transition name="view-slide-right" mode="out-in" appear>
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
import Caption from "@/components/MyWorks/Caption.vue";
import Navigation from "@/components/MyWorks/Navigation.vue";

</script>
