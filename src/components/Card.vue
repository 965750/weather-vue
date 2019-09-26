<template>
    <div class="card mt-5 px-3 py-2" v-if="getCard">
        <p class="card__city mb-0 text-center">
            {{ getCard.city.name }}
            <span class="card__country overline">
                {{ getCard.city.country }}
            </span>
        </p>
        <p class="card__date my-0 text-center caption">
            {{ currentTime }}
        </p>
        <SunVisual :clouds="extendedWeather.clouds" :rain="extendedWeather.rain" />
        <p class="mainTemp text-center">
            <span class="display-2 font-weight-bold">
                {{ Math.round(getCard.weatherList[0].main.temp) | kelvinsToCelsius }}
            </span>
            <span class="mainTemp__celsius">&#8451;</span>
        </p>
        <Statistics class="card__statistics" :weather="extendedWeather"/>
        <TimePeriods class="card__timePeriods" :periods="getCard.weatherList"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SunVisual from './SunVisual.vue';
import TimePeriods from './TimePeriods.vue';
import Statistics from './Statistics.vue';

export default {
  name: 'Card',
  data() {
    return {
      currentTime: null,
    };
  },
  components: {
    SunVisual,
    Statistics,
    TimePeriods,
  },
  methods: {
    buildCurrentTime() {
      const time = new Date();

      const day = this.$options.filters.shortDaysOfWeek(time.getDay() - 1);

      this.currentTime = `${day}, ${time.getHours()}:${time.getMinutes()}`;
    },
  },
  computed: {
    ...mapGetters(['getCard']),
    extendedWeather() {
      this.buildCurrentTime();

      const { length } = this.getCard.weatherList;

      const temperatures = [];

      const weather = {
        minTemp: 0,
        maxTemp: 0,
        cloudsTotal: 0,
        humidityTotal: 0,
        tempTotal: 0,
        windTotal: 0,
      };

      this.getCard.weatherList.forEach((current) => {
        temperatures.push(Math.round(current.main.temp));

        weather.cloudsTotal += current.clouds;
        weather.humidityTotal += current.main.humidity;
        weather.tempTotal += current.main.temp;
        weather.windTotal += current.wind;

        if (current.main.temp_min < weather.minTemp || !weather.minTemp) {
          weather.minTemp = current.main.temp_min;
        }

        if (current.main.temp_max > weather.maxTemp || !weather.maxTemp) {
          weather.maxTemp = current.main.temp_max;
        }
      });

      let mostCommon = temperatures.sort((a, b) => temperatures.filter(v => v === a).length
        - temperatures.filter(v => v === b).length).pop();

      if (temperatures.indexOf(mostCommon) === -1) {
        mostCommon = weather.tempTotal / length;
      }

      return {
        mostCommon,
        minTemp: weather.minTemp,
        maxTemp: weather.maxTemp,
        rain: this.getCard.weatherList[0].rain ? this.getCard.weatherList[0].rain : null,
        clouds: weather.cloudsTotal / length,
        humidity: weather.humidityTotal / length,
        temp: weather.tempTotal / length,
        wind: weather.windTotal / length,
      };
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main';

.card {
    width: 320px;
    height: 500px;
    margin: auto;
    border-radius: 10px;
    background-image: url("../assets/landscape.jpg");
    color: #FFF;
    position: relative;

    &__city {
        color: $osloGray;
    }

    &__country {
        color: darken($aluminium, 10%);
    }

    &__date {
        color: $osloGray;
        opacity: .5;
    }

    &__statistics {
        position: absolute;
        top: 55%;
        left: 5px;
        width: 310px;
    }

    &__timePeriods {
        position: absolute;
        bottom: 10px;
        left: 5px;
        width: 310px;
        margin: auto !important;
    }
}
.mainTemp {
    position: relative;

    &__celsius {
        position: absolute;
        top: 5px;
    }
}
</style>
