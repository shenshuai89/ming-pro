import { App } from "vue";
import ChooseCity from "./src/index.vue";

export default {
  install(app: App) {
    app.component("m-choose-city", ChooseCity);
  },
};
