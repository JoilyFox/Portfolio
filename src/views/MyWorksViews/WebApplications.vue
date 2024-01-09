<template>
	<div class="web-apps-gallery-container hover-gallery-container">
		<div 
			class="web-apps-gallery-item hover-gallery-item" 
			v-for="item in webAppsData"
			@click="modalData = item"
		>

			<a 
				class="gallery-item-image-link"
				@click="openWork(item)"
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
				<span 
					class="gallery-item-caption hover-underline-thin" 
					@click="openWork(item)"
				> 
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
		<WebAppModal
			:isActive="isModalActive"
			:modalData="modalData" 
			@close="closeWork()"
		/>

	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { webAppsData, tags } from "@/data/portfolioData";
import { IMAGE_PATH, NO_IMAGE_PATH } from "@/config/constants";
import { Fancybox } from "@fancyapps/ui";
import WebAppModal from "@/components/MyWorks/WebApp/Modal.vue";
import { shallowRef } from "@vue/reactivity";
import { getNestedValue, getValueFromObject } from "@/helpers/helpers";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const modalData = shallowRef({});

// Modal state ref
const isModalActive = ref(false);

function openWork(work) {
    router.push({ name: 'webApplications', params: { slug: work.slug } });
    doModal('show');
}
function closeWork() {
    router.push({ name: 'webApplications', params: { slug: null } });
    doModal('close');
}

watch(() => route.params?.slug, (newSlug) => {
    if (newSlug) {
        const work = webAppsData.find(item => item.slug === newSlug);
        if (work) {
            modalData.value = work;
            doModal('show');
        }
    } else {
        // If no slug, ensure the modal is closed
        doModal('close');
    }
}, { immediate: true });


/**
 * Change modal state
 */
function doModal(status: 'toggle' | 'close' | 'show'): void {
    const actions: { [key: string]: () => void } = {
        'toggle': () => isModalActive.value = !isModalActive.value,
        'close': () => isModalActive.value = false,
        'show': () => isModalActive.value = true,
    };

    getValueFromObject([status], actions, () => console.warn(`Invalid status: ${status}`))();
}

</script>
