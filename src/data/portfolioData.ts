import LogMyHours from "@/components/MyWorks/WebApp/ModalsComponents/LogMyHours/LMHMain.vue";
import { generateUUID } from "@/helpers/helpers";
import { WEB_APPS_IMAGE_PATH, MAIN_IMAGE_NAME } from "@/config/constants";

// Data
const webAppsData = [
    {
        id: generateUUID(),
        title: 'Log My Hours',
        description: 'A web store with basic functionality and an admin panel. Written in Laravel.',
        tags: ['store'],
        slug: 'log-my-hours', 
        mainImagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/' + MAIN_IMAGE_NAME,
        contentComponent: LogMyHours,
        fullDescription: "A basic web store with a user-friendly customer-facing interface and an intuitive admin panel was built using the Laravel PHP framework. \n\nThe goal of the project was to develop a functional, scalable solution for e-commerce businesses as a learning exercise, showcasing the developer's skills in using the Laravel framework. \n\nThe store has basic functionality, including the ability to manage inventory, process orders, and track sales data, and serves as a foundation for more advanced e-commerce projects.",
    },
    {
        id: generateUUID(),
        title: 'Test 2',
        description: 'A web store with basic functionality and an admin panel. Written in Laravel.',
        tags: ['store'],
        slug: 'web-store1', 
        fullDescription: '',
    },
    {
        id: generateUUID(),
        title: 'Test 333',
        description: 'A web store with basic functionality and an admin panel. Written in Laravel.',
        tags: ['store'],
        slug: 'web-store2', 
        fullDescription: '',
    },
];

const tags = {
    'store': 'store',

};

// Export

export { 
    webAppsData, 
    tags,
}