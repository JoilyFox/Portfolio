import LogMyHours from "@/components/MyWorks/WebApp/ModalsComponents/LogMyHours/LMHMain.vue";
import { generateUUID } from "@/helpers/helpers";
import { WEB_APPS_IMAGE_PATH, MAIN_IMAGE_NAME } from "@/config/constants";
import type { Component } from 'vue'

// Data
interface WebAppDataItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    slug: string;
    mainImagePath: string;
    contentComponent: Component;
}
const WEB_APP_DATA: WebAppDataItem[] = [
    {
        id: generateUUID(),
        title: 'Log My Hours',
        description: 'A web store with basic functionality and an admin panel. Written in Laravel.',
        tags: ['store'],
        slug: 'log-my-hours', 
        mainImagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/' + MAIN_IMAGE_NAME,
        contentComponent: LogMyHours,
    },
    {
        id: generateUUID(),
        title: 'Test 2',
        description: 'A web store with basic functionality and an admin panel. Written in Laravel.',
        tags: ['store'],
        slug: 'web-store1', 
        mainImagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/' + MAIN_IMAGE_NAME,
        contentComponent: LogMyHours,
    },
    {
        id: generateUUID(),
        title: 'Test 333',
        description: 'A web store with basic functionality and an admin panel. Written in Laravel.',
        tags: ['store'],
        slug: 'web-store2',
        mainImagePath: WEB_APPS_IMAGE_PATH + 'log-my-hours/' + MAIN_IMAGE_NAME,
        contentComponent: LogMyHours,
    },
];

// Tags are using for sorting works on the web apps page 
interface Tags {
    [key: string]: string;
}
const tags: Tags = {
    'store': 'store',

};

// Skills are using for sorting works on the web apps page 
interface Skill {
    name: string;
}
interface Skills {
    [key: string]: Skill;
}
const SKILLS: Skills = {
    'laravel': {
        name: 'Laravel',
    },
    'vue': {
        name: 'Vue',
    },
    'inertia': {
        name: 'Inertia',
    },
    'laravel_nova': {
        name: 'Laravel Nova',
    },
    'tailwind': {
        name: 'Tailwind CSS',
    },
    'docker': {
        name: 'Docker',
    },
    'scss': {
        name: 'SCSS',
    },
    'gitlab': {
        name: 'GitLab ',
    },
    'linux': {
        name: 'Linux',
    },
    'devops': {
        name: 'DevOps',
    },

};

// Export

export { 
    WEB_APP_DATA, 
    tags,
    SKILLS,
}