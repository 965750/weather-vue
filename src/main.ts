import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import myFilters from './myFilters';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCloud, faSun, faTint, faTemperatureLow, faTemperatureHigh, faThermometerHalf, faThermometerQuarter, faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCloud, faSun, faTint, faTemperatureLow, faTemperatureHigh, faThermometerHalf, faThermometerQuarter, faWind);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

myFilters.forEach((filter) => {
  Vue.filter(filter.name, filter.handler);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
