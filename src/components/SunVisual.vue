<template>
    <div class="day">
        <font-awesome-icon
            v-if="clouds > 20" class="day__cloud day__cloud--left"
            icon="cloud"
        />
        <font-awesome-icon
            v-if="clouds > 70" class="day__cloud day__cloud--right"
            icon="cloud"
        />
        <font-awesome-icon
            :class="{'day__sun': true, 'day__sun--oneCloud': clouds > 20 && clouds < 70}"
            icon="sun"
        />
        <div v-if="
            clouds > 20 &&
            rain &&
            Object.entries(rain).length !== 0 &&
            rain.constructor === Object
        ">
            <font-awesome-icon
                class="day__rain day__rain--left"
                icon="tint"
            />
            <font-awesome-icon
                class="day__rain day__rain--right"
                icon="tint"
            />
        </div>
    </div>
</template>

<script>
export default {
  name: 'SunVisual',
  props: {
    clouds: {
      required: true,
      type: Number,
    },
    rain: {
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main';

.day {
    position: relative;
    height: 90px;

    &__cloud {
        width: 70px !important;
        height: 60px;
        position: absolute;
        color: $oysterBay;
        z-index: 2;

        &--right {
            top: 50%;
            left: 48%;
            transform: translate(0, -60%);
        }

        &--left {
            top: 50%;
            left: 27%;
            transform: translate(0, -40%) scaleX(-1);
        }
    }

    &__rain {
        width: 20px !important;
        height: 20px;
        position: absolute;
        color: $danube;
        z-index: 3;

        &--left {
            top: 69%;
            left: 30%;
        }

        &--right {
            top: 61%;
            left: 42%;
        }
    }

    &__sun {
        color: $witchHaze;
        width: 80px !important;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &--oneCloud {
            left: 55%;
        }
    }
}
</style>
