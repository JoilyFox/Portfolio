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


// Render delay functionality
// let renderDelayShown = ref(false);

// setTimeout(() => {
//     renderDelayShown.value = true;
// }, 500);

// function renderDelayShown(timeout: number) {
//     let renderDelayShown = false;

//     setTimeout(() => {
//         renderDelayShown = true;
//     }, timeout);

//     return renderDelayShown;
// }



// Export
export { 
    isDesktopScreen, 
}