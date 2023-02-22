import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyLoad from 'vue3-lazyload';

import "./assets/scss/main.scss";

const app = createApp(App);

app.use(router);
app.use(VueLazyLoad, {
  loading: '',
  error: '',
  lifecycle: {
    error: (el) => {
      console.log('error', el)
    },
  }
})

app.mount("#app");


