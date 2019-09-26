<template>
    <v-row>
        <v-col
            :class="{'text-center': true, 'pa-1': true, 'period__block--divider': index !== 0}"
            v-for="(time, index) in periods" :key="time.time"
        >
            <p class="my-0 caption  font-weight-bold">
                {{ time.main.temp | kelvinsToCelsius}} &#8451;
            </p>
            <p class="period__label my-0 caption">
                {{ checkHour(time.time, index) }}
            </p>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'TimePeriods',
  props: {
    periods: {
      required: true,
      type: Array,
    },
  },
  methods: {
    checkHour(time, index) {
      const date = new Date(time * 1000);

      if (index === 0) {
        return 'NOW';
      }

      return `${date.getHours()}:00`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main';

.period {
    &__block {
        &--divider {
            border-left: 1px solid $aluminium;
        }
    }

    &__label {
        color: $aluminium
    }
}
</style>
