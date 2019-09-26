import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'en',
    card: null,
    error: null,
  },
  mutations: {
    setCard(state, data) {
      state.error = null;

      const weatherList = data.list.map((weather: any) => ({
        clouds: weather.clouds.all,
        time: weather.dt,
        wind: weather.wind.speed,
        rain: weather.rain ? weather.rain : null,
        main: {
          humidity: weather.main.humidity,
          pressure: weather.main.pressure,
          temp: weather.main.temp,
          temp_min: weather.main.temp_min,
          temp_max: weather.main.temp_max,
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
    setCard__Error(state, data) {
      state.error = 'We could not find this city name';
    },
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
  getters: {
    getCard: state => state.card,
    getError: state => state.error,
  },
});
