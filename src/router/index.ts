import { createRouter, createWebHistory, } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MyWorks from "@/views/MyWorks.vue";
import Contacts from "@/views/Contacts.vue";
import WebApplications from "@/views/MyWorksViews/WebApplications.vue";
import Artworks from "@/views/MyWorksViews/Artworks.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/my-works",
      name: "myWorks",
      component: MyWorks,
      redirect: { name: 'webApplications' },
      children: [
        {
          path: "web-applications",
          name: "webApplications",
          component: WebApplications,
        },
        {
          path: "artworks",
          name: "artworks",
          component: Artworks,
        },
      ],
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts,
    },
  ],
});

export default router;
