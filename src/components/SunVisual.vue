<template>
    <div class="day ">
        <font-awesome-icon v-if="clouds > 33" class="day__cloud day__cloud--left" icon="cloud" />
        <font-awesome-icon v-if="clouds > 66" class="day__cloud day__cloud--right" icon="cloud" />
        <font-awesome-icon :class="{'day__sun': true, 'day__sun--oneCloud': clouds > 33 && clouds < 67}" icon="sun" />
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
  },
};
</script>

<style lang="scss">
.day {
    position: relative;
    height: 100px;

    &__cloud {
        width: 70px !important;
        height: 60px;
        position: absolute;
        color: #d8faff;
        z-index: 3;

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

    &__sun {
        color: #fff891;
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
