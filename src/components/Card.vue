<template>
    <div class="card mt-5 pa-3" v-if="getCard">
        <p class="card__city mb-0 text-center">
            {{ getCard.city.name }}
            <span class="card__country overline">
                {{ getCard.city.country }}
            </span>
        </p>
        <p class="my-0 text-center caption">
            {{ currentDate }}
        </p>
        <SunVisual :clouds="extendedWeather.averages.cloudsTotal" />

        <DayPeriods :periods="extendedWeather.periods"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SunVisual from './SunVisual.vue';
import DayPeriods from './DayPeriods.vue';

export default {
  name: 'Card',
  components: {
    SunVisual,
    DayPeriods,
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

        console.log(current);
        if (new Date(current.time).getDay() === this.currentDay) {
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
          // day periods
          if (time >= 3 && time <= 12) {
            weather.periods.totals.morning += current.main.temp;
            weather.periods.counters.morning += 1;
          }

          if (time >= 9 && time <= 18) {
            weather.periods.totals.day += current.main.temp;
            weather.periods.counters.day += 1;
          }

          if (time >= 21 || time <= 6) {
            weather.periods.totals.night += current.main.temp;
            weather.periods.counters.night += 1;
          }
        }
      });

      return {
        ...weather,
        averages: {
          cloudsTotal: weather.averages.cloudsTotal / timeCounter,
          humidityTotal: weather.averages.humidityTotal / timeCounter,
          tempTotal: weather.averages.tempTotal / timeCounter,
          windTotal: weather.averages.windTotal / timeCounter,
        },
        periods: {
          morning: weather.periods.totals.morning / weather.periods.counters.morning,
          day: weather.periods.totals.day / weather.periods.counters.day,
          night: weather.periods.totals.night / weather.periods.counters.night,
        },
      };
    },
    currentDay() {
      return new Date(this.getCard.weatherList[0].time).getDay();
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main';

.card {
    width: 300px;
    height: 500px;
    border: 1px solid red;
    margin: auto;
    border-radius: 10px;
    background: cornflowerblue;
    color: #FFF;

    &__country {
        color: $aluminium;
    }
}
</style>
