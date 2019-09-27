export default {
  setCard(state, data) {
    state.error = null;

    const weatherList = data.list.map((weather: any) => ({
      clouds: weather.clouds.all,
      time: weather.dt,
      wind: weather.wind.speed,
      rain: weather.rain ? weather.rain : null,
      main: {
        humidity: weather.main.humidity,
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
  setCard__Error(state) {
    state.error = 'We could not find this city name';
  },
};
