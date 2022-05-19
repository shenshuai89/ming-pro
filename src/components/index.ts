import { App } from "vue";
import chooseIcon from "./chooseIcon";
import chooseArea from "./chooseArea";
import notification from "./notification";
import list from "./list";
import menu from "./menu";
import progress from "./progress";

const components = [chooseIcon, chooseArea, notification, list, menu, progress];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
