import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCloud,
  faSun,
  faTint,
  faTemperatureLow,
  faTemperatureHigh,
  faThermometerHalf,
  faThermometerQuarter,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import myFilters from './myFilters';
import messages from './locale/languages';


library.add(
  faCloud,
  faSun,
  faTint,
  faTemperatureLow,
  faTemperatureHigh,
  faThermometerHalf,
  faThermometerQuarter,
  faWind,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: store.getters.getLanguage,
  messages,
});

myFilters.forEach((filter) => {
  Vue.filter(filter.name, filter.handler);
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
