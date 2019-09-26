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
        <SunVisual :clouds="36" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SunVisual from './SunVisual.vue';

export default {
  name: 'Card',
  components: {
    SunVisual,
  },
  computed: {
    ...mapGetters(['getCard']),
    currentDate() {
      const time = new Date();
      console.log(time.getHours(), time.getMinutes());

      const day = this.$options.filters.shortDaysOfWeek(time.getDay() - 1);

      return `${day}, ${time.getHours()}:${time.getMinutes()}`;
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
