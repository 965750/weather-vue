<template>
    <div class="search">
        <p class="search__label my-0 pl-5">
            Check Your city weather
        </p>
        <form @submit.prevent="citySearch" class="search__form d-flex">
            <input
                v-model="city"
                class="search__field px-5"
                type="text"
                placeholder="city name"
            />
            <button class="search__submit" type="submit">
                Search
            </button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      city: '',
    };
  },
  methods: {
    citySearch() {
      console.log(this.city);
      this.$store.dispatch('citySearch', this.city);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main';

.search {
    width: 300px;

    &__label {
        font-size: 12px;
        color: $aluminium;
    }

    &__form {
        height: 50px;
        overflow: hidden;
    }

    &__field {
        width: 60%;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        outline: none;
        background: #FFF;
        line-height: 50px;
        font-size: 14px;
        border: 1px solid $aluminium;

        &::placeholder {
            color: $aluminium;
        }
    }

    &__submit {
        border-left: none;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        width: 40%;
        cursor: pointer;
        background: $deepCerulean;
        outline: none;
        color: #FFF;
        text-transform: uppercase;
        font-size: 20px;

        &:hover {
            background: lighten($deepCerulean, 5%);
        }
    }
}
</style>
