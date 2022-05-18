import { App } from "vue";
import chooseIcon from "./chooseIcon";
import chooseArea from "./chooseArea";
import notification from "./notification";

const components = [chooseIcon, chooseArea, notification];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
