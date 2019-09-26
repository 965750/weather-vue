import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'en',
    card: null,
  },
  mutations: {
    setCard(state, data) {
      const weatherList = data.list.map((weather: any) => ({
        clouds: weather.clouds.all,
        time: weather.dt,
        wind: weather.wind.speed,
        main: {
          humidity: weather.main.humidity,
          pressure: weather.main.pressure,
          temp: weather.main.temp,
        },
      }));

      state.card = {
        city: {
          name: data.city.name,
          country: data.city.country,
        },
        weatherList,
      };
    },
  },
  actions: {
    citySearch({ commit }, city: string) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${config.apiKey}`)
        .then((res) => {
          commit('setCard', res.data);
        });
    },
  },
});
