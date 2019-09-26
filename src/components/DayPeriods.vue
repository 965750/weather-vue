<template>
    <v-row>
        <v-col class="period text-center">
            <div class="period__visual border">
                <font-awesome-icon class="period__icon--morning" icon="sun" />
            </div>
            <p class="period__label my-0 caption">morning</p>
            <p class="my-0 font-weight-bold">{{ periods.morning | kelvinsToCelsius }} &#8451;</p>
        </v-col>
        <v-col class="period text-center">
            <div class="period__visual border">
                <font-awesome-icon class="period__icon--day" icon="sun" />
            </div>
            <p class="period__label my-0 caption">day</p>
            <p class="my-0 font-weight-bold">{{ periods.day | kelvinsToCelsius }} &#8451;</p>
        </v-col>
        <v-col class="period text-center">
            <div class="period__visual border">
                <font-awesome-icon class="period__icon--night" icon="sun" />
            </div>
            <p class="period__label my-0 caption">night</p>
            <p class="my-0 font-weight-bold">{{ periods.night | kelvinsToCelsius }} &#8451;</p>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'DayPeriods',
  props: {
    periods: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main';

.period {

    &__label {
        color: $aluminium
    }

    &__visual {
        border-bottom: 1px solid #FFF;
        position: relative;
        height: 30px;
        overflow: hidden;
    }

    &__icon {
        &--morning {
            position: absolute;
            bottom: -5px;
            left: 10px;
        }

        &--day {
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translate(-50%);
        }

        &--night {
            position: absolute;
            bottom: -5px;
            right: 10px;
        }
    }
}
</style>
