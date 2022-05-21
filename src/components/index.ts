import { App } from "vue";
import chooseIcon from "./chooseIcon";
import chooseArea from "./chooseArea";
import notification from "./notification";
import list from "./list";
import menu from "./menu";
import progress from "./progress";
import chooseTime from "./chooseTime";
import chooseDate from "./chooseDate";
import chooseCity from "./chooseCity";
import transition from "./transition";
import form from "./form";
import modalForm from "./modalForm";

const components = [
  chooseIcon,
  chooseArea,
  notification,
  list,
  menu,
  progress,
  chooseDate,
  chooseTime,
  chooseCity,
  transition,
  form,
  modalForm
];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
