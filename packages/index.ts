/* Automatically generated by './build/build.js' */
import { App } from "vue";
import chooseIcon from './chooseIcon';
import chooseArea from './chooseArea';
import notification from './notification';
import menu from './menu';
import progress from './progress';
import chooseCity from './chooseCity';
import chooseTime from './chooseTime';
import chooseDate from './chooseDate';
import transition from './transition';
import form from './form';
import table from './table';
import calendar from './calendar';
import modalForm from './modalForm';
import list from './list';
const components = [
    chooseIcon,
  chooseArea,
  notification,
  menu,
  progress,
  chooseCity,
  chooseTime,
  chooseDate,
  transition,
  form,
  table,
  calendar,
  modalForm,
  list,
];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
