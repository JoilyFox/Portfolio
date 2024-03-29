<template>
    <teleport to="body">
        <!-- Modal bg  -->
        <transition leave-active-class="duration-200">
            <div v-show="show" class="py-3 fixed flex flex-col items-center justify-center inset-0 px-3 z-50" scroll-region>
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
                        class="bg-white shadow-lg flex-1 transform transition-all sm:mx-auto flex flex-col overflow-hidden md:mb-16"
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
                        <div 
                            class="max-h-full overflow-x-hidden flex"
                            :class="[scrollabe ? 'overflow-y-auto' : 'overflow-y-hidden']"
                        >
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
import type { Ref } from 'vue'
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
        default: 'absolute sm:right-[22px] right-[12px] top-[18px] flex text-3xl p-2 opacity-60',
    },
    scrollabe: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['close']);

const bodyDOMRef = inject<Ref<HTMLElement>>(PROVIDE_PROPS_NAMES.bodyDOM);
const allContentRef = inject<Ref<HTMLElement>>(PROVIDE_PROPS_NAMES.allContentRef);

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
    const setBodyStyle = (style: string | null) => {
        if (bodyDOMRef?.value) {
            bodyDOMRef.value.style.overflow = style ?? '';
        }
    };

    const updateAllContentClass = (action: 'add' | 'remove') => {
        if (allContentRef?.value) {
            allContentRef.value.classList[action]('modal-active');
        }
    };

    const actions: Record<'disabled' | 'active', () => void> = {
        'disabled': () => {
            setBodyStyle('hidden');
            updateAllContentClass('add');
        },
        'active': () => {
            setBodyStyle(null);
            updateAllContentClass('remove');
        },
    };

    const actionFunction = getValueFromObject([status], actions, () => () => console.warn(`Invalid status: ${status}`));
    if (actionFunction) {
        actionFunction();
    }
};

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => {
    document.addEventListener('keydown', closeOnEscape);

    if (props.show) {
        makeAppBody('disabled');
    }
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