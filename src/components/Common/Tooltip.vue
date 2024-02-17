<template>
<div class="relative flex">
    <!-- Slot for the target element -->
    <div 
        class="z-10 target flex h-full w-full"
        @mouseenter="showTooltip" 
        @mouseleave="hideTooltip"
        ref="targetRef"
        :class="[additionalTargetClasses]"
    >
        <slot name="target" />
    </div>

    <!-- Tooltip content -->
    <transition :name="tooltipTransition">
        <div 
            v-show="isVisible && !isDisable"
            :class="[sideClasses, alignClasses, additionalTooltipClasses, {'pointer-events-none': !keepVisibleOnHover}]" 
            class="z-50 content absolute"
            ref="tooltipRef"
            :style="[gapStyles]"
        >
            <div 
                class="w-full h-full" 
                :class="[tooltipAppearance]"
                :style="[sizeStyles]"
            >
                <slot name="content" />
            </div>
        </div>
    </transition>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick, watch, inject, onMounted } from 'vue';
import { getValueFromObject } from "@/helpers/helpers";
import { PROVIDE_PROPS_NAMES } from "@/config/constants";

const props = defineProps({
    /**
     * Determines the side where the tooltip appears relative to the target.
     * Possible values: 'top', 'bottom', 'left', 'right', 'auto'.
     * When set to 'auto', the tooltip side is automatically determined based on available space.
     */
    tooltipSide: {
        type: String, 
        default: 'auto' 
    },

    /**
     * Orientation preference for automatic tooltip positioning when tooltipSide is 'auto'.
     * Possible values: 'horizontal', 'vertical'.
     * 'horizontal' prefers 'left' or 'right'; 'vertical' prefers 'top' or 'bottom'.
     */
    sideAutoPreference: {
        type: String,
        default: 'horizontal'
    },

    /**
     * Alignment of the tooltip relative to the target element.
     * Possible values: 'start', 'middle', 'end'.
     */
    tooltipAlign: { 
        type: String, 
        default: 'auto' 
    },

    /**
     * Preferred alignment for the tooltip when `tooltipAlign` is 'auto'.
     * Possible values: 'start', 'end'.
     */
    alignAutoPreference: {
        type: String,
        default: 'start'
    },
    
    /**
     * Determines if the tooltip should remain visible when hovered.
     */
    keepVisibleOnHover: { 
        type: Boolean, 
        default: false 
    },
    
    /**
     * Delay in milliseconds before showing the tooltip after a hover event.
     */
    hoverDelay: { 
        type: Number, 
        default: 0 
    },

    /**
     * Gap size (in pixels) between the tooltip and the target element.
     */
    gap: {
        type: [Number, String], 
        default: 0 
    },
    
    /**
     * Maximum width of the tooltip in pixels.
     * Can be null for auto width.
     */
    maxWidth: { 
        type: Number, 
        default: 320 
    },
    
    /**
     * Maximum height of the tooltip in pixels.
     * Can be null for auto height.
     */
    maxHeight: { 
        type: Number, 
        default: null 
    },
    
    /**
     * Minimum width of the tooltip in pixels.
     * Can be null for auto width.
     */
    minWidth: { 
        type: Number, 
        default: 16
    },
    
    /**
     * Minimum height of the tooltip in pixels.
     * Can be null for auto height.
     */
    minHeight: { 
        type: Number, 
        default: 16 
    },
    
    /**
     * CSS classes to define the appearance of the tooltip.
     */
    tooltipAppearance: {
        type: String,
        default: 'rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-lg'
    },
    
    /**
     * Transition name to be applied to the tooltip for enter/leave animations.
     */
    tooltipTransition: { 
        type: String, 
        default: 'tooltip-default'
    },

    /**
     * Reference to the main content element, used for calculating tooltip positioning in 'auto' side or alignment mode.
     * Use this, for example, if your tooltip is inside an element with scrolling.
     */
    mainContentRef: { 
        type: Object, 
        default: null
    },

    /**
     * Force disable for tooltip.
     */
    isDisable: {
        type: Boolean,
        default: false
    },

    /**
     * Additional tooltip CSS classes.
     * For example to hide tooltip on mobile.
     */
    additionalTooltipClasses: { 
        type: String, 
        default: 'max-md:hidden' 
    },

    /**
     * Additional target CSS classes.
     * For example to hide tooltip on mobile.
     */
    additionalTargetClasses: { 
        type: String, 
        default: '' 
    },
});

/**
 * Reference to the main content element. 
 * If not provided through props, it's injected from a MainLayout component.
 * This reference is used for calculating the optimal positioning of the tooltip.
 */
const mainContentRef = props.mainContentRef ?? inject(PROVIDE_PROPS_NAMES.allContentRef);

/**
 * Reactive state indicating whether the tooltip is currently visible.
 */
const isVisible = ref(false);

/**
 * Variable to hold a timeout ID for the hover delay functionality.
 */
let hoverTimeout = null;

/**
 * Reactive array of classes that determine the current side of the tooltip.
 */
const sideClasses = ref([]);

/**
 * Reactive array of classes that determine the current align of the tooltip.
 */
const alignClasses = ref([]);

/**
 * Reactive object that stores the styles for the gap between the tooltip and the target element.
 */
const gapStyles = ref({});

/**
 * Reactive object that stores current side of tooltip.
 */
const currentSide = ref(props.tooltipSide);

/**
 * Reactive object that stores current align of tooltip.
 */
const currentAlign = ref(props.tooltipAlign);

/**
 * Reference to the target element.
 */
const targetRef = ref(null);

/**
 * Reference to the tooltip element.
 */
const tooltipRef = ref(null);

/**
 * Shows the tooltip with a delay.
 * Activates the tooltip visibility after delay that set in 'props.hoverDelay'.
 */
const showTooltip = () => {
    hoverTimeout = setTimeout(() => {
        nextTick(() => {
            isVisible.value = true;
        });
    }, props.hoverDelay);
};

/**
 * Hides the tooltip and clears any active timeout.
 * Deactivates the tooltip visibility immediately.
 */
const hideTooltip = () => {
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
    }
    isVisible.value = false;
};

onUnmounted(() => {
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
    }
    isVisible.value = false;
});

/**
 * Constants defining the possible sides where the tooltip can appear.
 */
const SIDES = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    AUTO: 'auto',
};

/**
 * Constants defining the alignment of the tooltip relative to the target element.
 */
const ALIGNMENTS = {
    START: 'start',
    MIDDLE: 'middle',
    END: 'end',
    AUTO: 'auto',
};

/**
 * Constants for automatic side preference.
 */
const SIDE_PREFERENCES = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
};

/**
 * Constants for automatic alignment preference.
 */
const ALIGN_PREFERENCES = {
    START: 'start',
    END: 'end',
};

/**
 * Mapping of CSS classes for tooltip side.
 */
const sideClassMap = {
    [SIDES.TOP]: ['bottom-full'],
    [SIDES.BOTTOM]: ['top-full'],
    [SIDES.LEFT]: ['right-full'],
    [SIDES.RIGHT]: ['left-full'],
};

/**
 * Mapping of CSS classes for tooltip alignment.
 */
const alignClassMap = {
    [SIDES.TOP]: {
        [ALIGNMENTS.START]: ['left-0'],
        [ALIGNMENTS.MIDDLE]: ['left-1/2', 'transform', '-translate-x-1/2'],
        [ALIGNMENTS.END]: ['right-0']
    },
    [SIDES.BOTTOM]: {
        [ALIGNMENTS.START]: ['left-0'],
        [ALIGNMENTS.MIDDLE]: ['left-1/2', 'transform', '-translate-x-1/2'],
        [ALIGNMENTS.END]: ['right-0']
    },
    [SIDES.LEFT]: {
        [ALIGNMENTS.START]: ['top-0'],
        [ALIGNMENTS.MIDDLE]: ['top-1/2', 'transform', '-translate-y-1/2'],
        [ALIGNMENTS.END]: ['bottom-0']
    },
    [SIDES.RIGHT]: {
        [ALIGNMENTS.START]: ['top-0'],
        [ALIGNMENTS.MIDDLE]: ['top-1/2', 'transform', '-translate-y-1/2'],
        [ALIGNMENTS.END]: ['bottom-0']
    },
};

/**
 * Mapping of styles for the gap between the tooltip and the target element.
 */
const gapStyleMap = {
    [SIDES.TOP]: { paddingBottom: `${props.gap}px` },
    [SIDES.BOTTOM]: { paddingTop: `${props.gap}px` },
    [SIDES.LEFT]: { paddingRight: `${props.gap}px` },
    [SIDES.RIGHT]: { paddingLeft: `${props.gap}px` }
};

/**
 * Computed styles for the tooltip size.
 */
const sizeStyles = computed(() => {
    return [
        { maxWidth: `${props.maxWidth}px` },
        { maxHeight: `${props.maxHeight}px` },
        { minWidth: `${props.minWidth}px` },
        { minHeight: `${props.minHeight}px` },
    ]
});

/**
 * Calculates the optimal side for the tooltip based on available space.
 */
const calculateOptimalSide = () => {
    if (!targetRef.value || props.tooltipSide !== SIDES.AUTO) return [];

    // Get tooltip dimensions
    const appContentRect = mainContentRef.value.getBoundingClientRect();
    const targetRect = targetRef.value.parentElement.getBoundingClientRect();

    // Calculate available space
    const availableSpace = {
        [SIDES.TOP]: targetRect.top - appContentRect.top,
        [SIDES.BOTTOM]: appContentRect.bottom - targetRect.bottom,
        [SIDES.LEFT]: targetRect.left - appContentRect.left,
        [SIDES.RIGHT]: appContentRect.right - targetRect.right
    };

    const calculateSideMap = {
        [SIDE_PREFERENCES.HORIZONTAL]: availableSpace.left > availableSpace.right ? SIDES.LEFT : SIDES.RIGHT,
        [SIDE_PREFERENCES.VERTICAL]: availableSpace.top > availableSpace.bottom ? SIDES.TOP : SIDES.BOTTOM,
    };

    // Decide the side based on available space and preference
    const newSide = getValueFromObject([props.sideAutoPreference], calculateSideMap, SIDES.LEFT);

    // Set new side value to reactive constants
    currentSide.value = newSide;

    // Apply gap styles
    gapStyles.value = getValueFromObject([newSide], gapStyleMap, {});
    
    // Apply classes for the new side
    sideClasses.value = getValueFromObject([newSide], sideClassMap, []);
};

/**
 * Calculates the optimal align for the tooltip based on available space.
 */
const calculateOptimalAlign = () => {
    if (!targetRef.value || props.tooltipAlign !== ALIGNMENTS.AUTO) return [];

    // Get tooltip dimensions
    const appContentRect = mainContentRef.value.getBoundingClientRect();
    const targetRect = targetRef.value.parentElement.getBoundingClientRect();
    const tooltipHeight = tooltipRef.value.offsetHeight + 50;
    const tooltipWidth = tooltipRef.value.offsetWidth + 20;

    const calculateAlignMap = {
        [SIDES.TOP]: {
            [ALIGN_PREFERENCES.START]: appContentRect.right - targetRect.left > tooltipWidth ? ALIGNMENTS.START : ALIGNMENTS.END,
            [ALIGN_PREFERENCES.END]: appContentRect.left - targetRect.rigth > tooltipWidth ? ALIGNMENTS.END : ALIGNMENTS.START,
        },
        [SIDES.BOTTOM]: {
            [ALIGN_PREFERENCES.START]: appContentRect.right - targetRect.left > tooltipWidth ? ALIGNMENTS.START : ALIGNMENTS.END,
            [ALIGN_PREFERENCES.END]: appContentRect.left - targetRect.rigth > tooltipWidth ? ALIGNMENTS.END : ALIGNMENTS.START,
        },
        [SIDES.LEFT]: {
            [ALIGN_PREFERENCES.START]: appContentRect.bottom - targetRect.top > tooltipHeight ? ALIGNMENTS.START : ALIGNMENTS.END,
            [ALIGN_PREFERENCES.END]: appContentRect.top - targetRect.bottom > tooltipHeight ? ALIGNMENTS.END : ALIGNMENTS.START,
        },
        [SIDES.RIGHT]: {
            [ALIGN_PREFERENCES.START]: appContentRect.bottom - targetRect.top > tooltipHeight ? ALIGNMENTS.START : ALIGNMENTS.END,
            [ALIGN_PREFERENCES.END]: appContentRect.top - targetRect.bottom > tooltipHeight ? ALIGNMENTS.END : ALIGNMENTS.START,
        },
    };

    // Decide the alignment based on available space and preference
    const newAlign = getValueFromObject([currentSide.value, props.alignAutoPreference], calculateAlignMap, ALIGNMENTS.START);

    // Set new align value to reactive constants
    currentAlign.value = newAlign;

    // Apply classes for the new side
    alignClasses.value = getValueFromObject([currentSide.value, newAlign], alignClassMap, []);
};

/**
 * Updates the tooltip position by recalculating and applying classes.
 * Used when the tooltip becomes visible or when certain conditions change.
 */
const updateTooltipPosition = () => {
    
    // Apply side styles
    if (props.tooltipSide === SIDES.AUTO) {
        calculateOptimalSide();
    } else {
        sideClasses.value = getValueFromObject([props.tooltipSide], sideClassMap, []);

        // Apply gap styles
        gapStyles.value = getValueFromObject([props.tooltipSide], gapStyleMap, {});
    }

    // Apply align styles
    if (props.tooltipAlign === ALIGNMENTS.AUTO) {
        calculateOptimalAlign();
    } else {
        alignClasses.value = getValueFromObject([props.tooltipSide, props.tooltipAlign], alignClassMap, []);
    }
};

/**
 * Watches for changes in the tooltip's visibility state and update the tooltip position.
 */
watch(isVisible, (newVal) => {
    if (newVal) {
        nextTick(() => {
            updateTooltipPosition();
        });
    }
});

onMounted(() => {
    nextTick(() => {
        updateTooltipPosition();
    });
})

</script>

<style scoped lang="scss">
$transitionDuration: 0.24s;
$transitionTransform: 3px;

// Tooltip default transition
.tooltip-default-move,
.tooltip-default-enter-active,
.tooltip-default-leave-active {
    transition: $transitionDuration;
    opacity: 1;
}
.tooltip-default-enter-from {
    opacity: 0;
    transform: translateY($transitionTransform);
}
.tooltip-default-leave-to {
    opacity: 0;
    transform: translateY(-$transitionTransform);
}
</style>