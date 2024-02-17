<template>
    <div class="webAppModalCarouselWrapper" :class="[carouselHeightClass, marginTop]">
        <div class="webAppModalCarousel" ref="carouselViewport">
            <transition name="carousel-modal-transition">
                <FancyBox 
                    :data="data"
                    :options="{ Carousel: { infinite: isInfinite } }"
                    ref="fancyBoxGallery"
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
                            :data-caption="getNestedValue(slide, 'caption', '')"
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
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
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
    },
    marginTop: {
        type: String,
        default: 'mt-10'
    },
});

const carouselViewport = ref(null);
const isCarouselMounted = ref(false);
const fancyBoxGallery = ref(null);

const carouselOptions = { 
    infinite: props.isInfinite,
    transition: 'slide'
}

onMounted(() => {
    setTimeout(() => {
        isCarouselMounted.value = true;
    }, props.mountingDelay);
});

const carouselHeightClass = ref('carouselWrapperHeight');

watch(isCarouselMounted, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            carouselHeightClass.value = '';
        }, 500); // delay in milliseconds
    }
});

// Function to open specific slide of carousel in fancybox gallery by id
function openFancyBoxSlide(id: string): void {
    if (fancyBoxGallery.value && typeof fancyBoxGallery.value.openFancyBoxSlide === 'function') {
        fancyBoxGallery.value.openFancyBoxSlide(id);
    } else {
        console.error("FancyBox component or its method is not available");
    }
}

defineExpose({ openFancyBoxSlide });
</script>

<style lang="scss">


</style>