<template>
    <div class="card mt-5 px-4 py-2" v-if="getCard">
        <p class="card__city mb-0 text-center">
            {{ getCard.city.name }}
            <span class="card__country overline">
                {{ getCard.city.country }}
            </span>
        </p>
        <p class="card__date my-0 text-center caption">
            {{ currentDate }}
        </p>
        <SunVisual :clouds="extendedWeather.averages.clouds" />
        <p class="mainTemp text-center">
            <span class="display-2 font-weight-bold">
                {{ getCard.weatherList[0].main.temp | kelvinsToCelsius }}
            </span>
            <span class="mainTemp__celsius">&#8451;</span>
        </p>
        <TimePeriods :periods="getCard.weatherList"/>
<!--        <DayPeriods class="mt-10" :periods="extendedWeather.periods"/>-->

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SunVisual from './SunVisual.vue';
import DayPeriods from './DayPeriods.vue';
import TimePeriods from './TimePeriods.vue';

export default {
  name: 'Card',
  components: {
    SunVisual,
    DayPeriods,
    TimePeriods
  },
  computed: {
    ...mapGetters(['getCard']),
    currentDate() {
      const time = new Date();

      const day = this.$options.filters.shortDaysOfWeek(time.getDay() - 1);

      return `${day}, ${time.getHours()}:${time.getMinutes()}`;
    },
    extendedWeather() {
      let timeCounter = 0;
      const weather = {
        tempRange: {
          minTemp: 0,
          maxTemp: 0,
        },
        averages: {
          cloudsTotal: 0,
          humidityTotal: 0,
          tempTotal: 0,
          windTotal: 0,
        },
        periods: {
          totals: {
            morning: 0,
            day: 0,
            night: 0,
          },
          counters: {
            morning: 0,
            day: 0,
            night: 0,
          },
        },
      };

      this.getCard.weatherList.forEach((current) => {
        const time = new Date(current.time * 1000).getHours() + 1;

        timeCounter += 1;
        // averages
        weather.averages.cloudsTotal += current.clouds;
        weather.averages.humidityTotal += current.main.humidity;
        weather.averages.tempTotal += current.main.temp;
        weather.averages.windTotal += current.wind;
        // temp range
        if (current.main.temp_min < weather.tempRange.minTemp || !weather.tempRange.minTemp) {
          weather.tempRange.minTemp = current.main.temp_min;
        }

        if (current.main.temp_max > weather.tempRange.maxTemp || !weather.tempRange.maxTemp) {
          weather.tempRange.maxTemp = current.main.temp_max;
        }
      });

      console.log(weather, 333333);

      return {
        ...weather,
        averages: {
          clouds: weather.averages.cloudsTotal / timeCounter,
          humidity: weather.averages.humidityTotal / timeCounter,
          temp: weather.averages.tempTotal / timeCounter,
          wind: weather.averages.windTotal / timeCounter,
        },
      };
    },
    currentDay() {
      return new Date(this.getCard.weatherList[0].time * 1000).getDay();
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main';

.card {
    width: 300px;
    height: 500px;
    margin: auto;
    border-radius: 10px;
    background-image: url("../assets/landscape.jpg");
    color: #FFF;

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
}
.mainTemp {
    position: relative;

    &__celsius {
        position: absolute;
        top: 5px;
    }
}
</style>
