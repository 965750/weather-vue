import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'pl',
    card: null,
    error: null,
  },
  actions: {
    citySearch({ commit }, city: string) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${config.cnt}&APPID=${config.apiKey}`)
        .then((res) => {
          commit('setCard', res.data);
        })
        .catch((err) => {
          commit('setCard__Error', err);
        });
    },
  },
  mutations,
  getters,
});
