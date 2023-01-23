// Imports
import { ref } from "vue";


// Helpers


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
}