<template>
    <div class="webAppModalCarousel" ref="carouselViewport">
        <transition name="carousel-modal-transition">
            <FancyBox 
                :options="{ Carousel: { infinite: false } }"
                v-if="isCarouselMounted"
            >
                <Carousel :options="carouselOptions">
                    <div
                        v-for="(slide, key) in carouselData"
                        className="f-carousel__slide"
                        data-fancybox="gallery"
                        :data-src="getNestedValue(slide, 'imagePath', NO_IMAGE_PATH)"
                        :data-thumb-src="getNestedValue(slide, 'imagePath', NO_IMAGE_PATH)"
                    >
                        <img
                            alt=""
                            :src="getNestedValue(slide, 'imagePath', NO_IMAGE_PATH)"
                        />
                    </div>
                </Carousel>
            </FancyBox>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FancyBox from "@/components/Common/FancyBox/FancyBox.vue";
import Carousel from "@/components/Common/FancyBox/Carousel.vue";
import { getNestedValue } from "@/helpers/helpers";
import { NO_IMAGE_PATH } from "@/config/constants";
import { MODAL_TRANSITION_DURATION } from "@/config/components/webAppModalConstants";

const props = defineProps({
    carouselData: {
        type: Array,
        default: []
    },
    carouselMountingDelay: {
        type: Number,
        default: MODAL_TRANSITION_DURATION
    }
});

const carouselViewport = ref(null);
const isCarouselMounted = ref(false);

const carouselOptions = { 
    infinite: false,
    transition: 'slide'
    // center: true,
    // viewport: carouselViewport.value,
}

onMounted(() => {
    setTimeout(() => {
        isCarouselMounted.value = true;
    }, props.carouselMountingDelay);
});

</script>

<style lang="scss">
.webAppModalCarousel {
    height: 492px;

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

.carousel-modal-transition {
    &-enter-to, &-leave-from {
        opacity: 1;
        transition: .3s;
    }
    &-enter-from, &-leave-to {
        opacity: 0;
    }
}

</style>