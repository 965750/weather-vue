<template>
    <div class="search my-5 mx-auto">
        <p class="search__label my-0 pl-5">
            {{ $t('Check Your city weather') }}
        </p>
        <form
            id="searchForm"
            @submit.prevent="citySearch"
            class="search__form d-flex"
        >
            <input
                id="searchField"
                v-model="city"
                class="search__field px-5"
                type="text"
                :placeholder="$t('city name')"
            />
            <button
                :disable="!city"
                class="search__submit"
                type="submit"
            >
                {{ $t('search') }}
            </button>
        </form>
        <p
            v-if="getError"
            class="search__error pl-5 caption"
        >
            {{ getError }}
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      city: '',
    };
  },
  computed: {
    ...mapGetters(['getError']),
  },
  methods: {
    citySearch() {
      this.$store.dispatch('citySearch', this.city);

      this.city = '';
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

        &:focus {
            border: 1px solid $deepCerulean;
        }
    }

    &__error {
        color: $persimmon;
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
