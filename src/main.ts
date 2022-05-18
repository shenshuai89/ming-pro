import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
// import MingPro from "./components"
// import MingPro from "../lib/ming-pro.es.js";
// import "../lib/style.css";

import chooseIcon from "../lib/chooseIcon/index.es";
import "../lib/chooseIcon/style.css"


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`icon-${toLine(key)}`, component);
}
app.use(router).use(ElementPlus).use(chooseIcon).mount("#app");

function toLine(value: string) {
  return value.replace(/(A-Z)g/, "-$1").toLowerCase();
}
