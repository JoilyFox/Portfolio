<template>
  <section>
    <p>contacts</p>

  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.webAppModalCarousel {
    .f-carousel {
        --f-carousel-spacing: 12px;
        --f-carousel-slide-width: 100%;
        max-width: 640px;
        height: 400px;
        margin: 0 auto;

        &__slide {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                max-width: 100%;
                height: auto;
            }
        }
    }

}

</style>