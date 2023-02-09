// Imports
import { ref } from "vue";


// Helpers

// Check screen size and updates it on resize
const isDesktopScreen = ref(checkIsDesktopScreen());

function checkIsDesktopScreen() {
    return window.innerWidth > 1023 
}

window.addEventListener('resize', () => { 
    isDesktopScreen.value = checkIsDesktopScreen() 
});



// Export
export { 
    isDesktopScreen, 
    selectLazyParents
}