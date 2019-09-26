<template>
    <div class="d-flex justify-center flex-wrap">
        <SingleAttribute
            v-for="attr in attributes" :key="attr.label"
            :icon="attr.icon"
            :label="attr.label"
            :value="attr.value"
        />
    </div>
</template>

<script>
import SingleAttribute from './SingleAttribute.vue';

export default {
  name: 'Statistics',
  components: {
    SingleAttribute,
  },
  props: {
    weather: {
      required: true,
      type: Object,
    },
  },
  computed: {
    attributes() {
      return [
        {
          value: `${this.$options.filters.kelvinsToCelsius(this.weather.minTemp)} \t\u2103`,
          label: 'min. temp.',
          icon: 'temperature-low',
        },
        {
          value: `${this.$options.filters.kelvinsToCelsius(this.weather.maxTemp)} \t\u2103`,
          label: 'max. temp.',
          icon: 'temperature-high',
        },
        {
          value: `${this.$options.filters.kelvinsToCelsius(this.weather.temp)} \t\u2103`,
          label: 'mean temp.',
          icon: 'thermometer-half',
        },
        {
          value: `${this.$options.filters.kelvinsToCelsius(this.weather.mostCommon)} \t\u2103`,
          label: 'mode temp.',
          icon: 'thermometer-quarter',
        },
        {
          value: `${this.weather.clouds}%`,
          label: 'clouds',
          icon: 'cloud',
        },
        {
          value: `${this.weather.wind.toFixed(2)} m/s`,
          label: 'wind',
          icon: 'wind',
        },
        {
          value: `${this.weather.humidity}%`,
          label: 'humidity',
          icon: 'tint',
        },
      ];
    },
  },
};
</script>
