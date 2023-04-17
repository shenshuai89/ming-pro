import { App } from 'vue';
import search from './src/index.vue';
export default {
  install(app: App) {
    app.component('m-search', search);
  },
};
