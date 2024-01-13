<template>
    <div class="webAppModalCarousel mt-10" ref="carouselViewport">
        <transition name="carousel-modal-transition">
            <FancyBox 
                :options="{ Carousel: { infinite: isInfinite } }"
                v-if="isCarouselMounted"
            >
                <Carousel 
                    :options="carouselOptions" 
                    :showThumbs="isScreenSize('sm', '>')"
                    :showDots="isScreenSize('sm', '<')"
                >
                    <div
                        v-for="(slide, key) in data"
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
import { getNestedValue, isScreenSize } from "@/helpers/helpers";
import { NO_IMAGE_PATH } from "@/config/constants";
import { MODAL_TRANSITION_DURATION } from "@/config/components/webAppModalConstants";

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    mountingDelay: {
        type: Number,
        default: MODAL_TRANSITION_DURATION
    },
    isInfinite: {
        type: Boolean,
        default: true,
    }
});

const carouselViewport = ref(null);
const isCarouselMounted = ref(false);

const carouselOptions = { 
    infinite: props.isInfinite,
    transition: 'slide'
    // center: true,
    // viewport: carouselViewport.value,
}

onMounted(() => {
    setTimeout(() => {
        isCarouselMounted.value = true;
    }, props.mountingDelay);
});

</script>

<style lang="scss">


</style>