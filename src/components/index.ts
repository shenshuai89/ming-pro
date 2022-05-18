import { App } from "vue";
import chooseIcon from "./chooseIcon";
import chooseArea from "./chooseArea";
import notification from "./notification";
import list from "./list";

const components = [chooseIcon, chooseArea, notification, list];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
