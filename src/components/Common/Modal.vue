<template>
    <teleport to="body">
        <!-- Modal bg  -->
        <transition leave-active-class="duration-200">
            <div v-show="show" class="py-3 fixed flex items-center justify-center inset-0 px-3 z-50" scroll-region>
                <transition
                    :enter-active-class="`${transitionFuncClass} ${transitionDurationClass}`"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    :leave-active-class="`${transitionFuncClass} ${transitionDurationClass}`"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-black opacity-50" />
                    </div>
                </transition>

                <!-- Modal content -->
                <transition
                    :enter-active-class="`${transitionFuncClass} ${transitionDurationClass}`"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-110"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    :leave-active-class="`${transitionFuncClass} ${transitionDurationClass}`"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-110"
                >
                    <div
                        v-show="show"
                        class="bg-white shadow-lg transform transition-all sm:mx-auto flex flex-col overflow-hidden md:mb-16"
                        :class="[widthClass, additionalBodyClasses, maxHeight]"
                    >   
                        <!-- Close btn -->
                        <button 
                            :class="closeBtnClasses"
                            @click="close"
                        >
                            <Icon icon="close" class="font-inherit"/>
                        </button>

                        <!-- Content -->
                        <div class="max-h-full overflow-auto">
                            <slot v-if="show"/>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, inject } from 'vue';
import { PROVIDE_PROPS_NAMES } from "@/config/constants";
import { getValueFromObject } from "@/helpers/helpers";
import Icon from "@/components/Common/Icon.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '2xl',
    },
    maxHeight: {
        type: String,
        default: 'md:max-h-[80vh] max-h-full',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    additionalBodyClasses: {
        type: String,
        default: '',
    },
    transitionDuration: {
        type: [String, Number],
        default: '400',
    },
    transitionFunction: {
        type: String,
        default: 'dynamic',
    },
    closeBtnClasses: {
        type: String,
        default: 'absolute sm:right-[22px] right-[12px] top-[21px] flex text-3xl p-2',
    }
});

const emit = defineEmits(['close']);

const bodyDOMRef = inject(PROVIDE_PROPS_NAMES.bodyDOM);
const allContentRef = inject(PROVIDE_PROPS_NAMES.allContentRef);

watch(() => props.show, () => {
    if (props.show) {
        makeAppBody('disabled');
    } else {
        makeAppBody('active');
    }
});

/**
 * Change modal state
 */
 const makeAppBody = (status: 'disabled' | 'active'): void => {
    const actions: { [key: string]: () => void } = {
        'disabled': () => {
            bodyDOMRef.value.style.overflow = 'hidden';
            allContentRef.value.classList.add('modal-active');
        },
        'active': () => {
            bodyDOMRef.value.style.overflow = null;
            allContentRef.value.classList.remove('modal-active');
        },
    };

    getValueFromObject([status], actions, () => console.warn(`Invalid status: ${status}`))();
}

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => {
    document.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    makeAppBody('active');
});

// Class maps
const widthClass = computed(() => {
    return {
        sm: 'w-sm max-w-full',
        md: 'w-ms max-w-full',
        lg: 'w-lg max-w-full',
        xl: 'w-xl max-w-full',
        '2xl': 'w-[672px] max-w-full',
        '3xl': 'w-[768px] max-w-full',
        '4xl': 'w-[896px] max-w-full',
    }[props.width];
});

const transitionDurationClass = computed(() => {
    return {
        400: 'duration-[400ms]',
    }[props.transitionDuration];
});

const transitionFuncClass = computed(() => {
    return {
        'dynamic': 'ease-[cubic-bezier(0.165,0.840,0.440,1.000)]',
    }[props.transitionFunction];
});

    
</script>

<style scoped lang="scss">
.modal-content {
    $modal-transition-duration: v-bind('modalTransitionDuration');
    $modal-transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);

    &-move,
    &-enter-active,
    &-leave-active {
        transition-duration: $modal-transition-duration;
        transition-timing-function: $modal-transition-timing-function;
    }

    &-enter-to, &-leave-from,
    &-enter-active, &-leave-active {
        opacity: 1;
        transform: scale(1);
    }
    &-enter-enter, &-leave-to {
        opacity: 0;
        transform: scale(1.2);
    }
}
.modal-content {
    $modal-transition-duration: v-bind('modalTransitionDuration');
    $modal-transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);

    &-enter-active, &-leave-active, &-move {
        opacity: 1;
        transition-duration: $modal-transition-duration;
        transition-timing-function: $modal-transition-timing-function;
        transition-delay: 100s;
    }
    &-enter-enter, &-leave-to {
        opacity: 0;
        transform: scale(1.2);
    }
}
</style>