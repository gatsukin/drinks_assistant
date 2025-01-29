import "./style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { registerPlugins } from '@core/utils/plugins'


import App from "./App.vue";
import router from "./router";

import TheLoader from "./components/TheLoader.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("TheLoader", TheLoader);

registerPlugins(app)

// import eruda from 'eruda';
// eruda.init();

app.mount("#app");
