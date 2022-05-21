import { App } from "vue";
import transition from "./src/index.vue";
export default {
  install(app: App) {
    app.component("m-transition", transition);
  },
};
