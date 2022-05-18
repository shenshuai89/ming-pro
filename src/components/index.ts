import { App } from "vue";
import chooseIcon from "./chooseIcon";

const components = [chooseIcon];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
