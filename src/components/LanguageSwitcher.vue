<template>
    <div class="lang d-flex text-center text-uppercase">
        <div
            v-for="language in languages"
            :key="language"
            :class="{lang__btn: true, 'lang__btn--active': getLanguage === language}"
            @click="lang = language"
        >
            {{ language }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      lang: '',
      languages: ['pl', 'en'],
    };
  },
  computed: {
    ...mapGetters(['getLanguage']),
  },
  mounted() {
    this.lang = this.getLanguage;
  },
  watch: {
    lang(val) {
      this.$i18n.locale = val;
      this.$store.dispatch('changeLanguage', val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/main';

.lang {
    width: 70px;
    border-radius: 30px;
    height: 30px;
    overflow: hidden;
    color: #FFF;
    position: absolute;
    top: 10px;
    right: 5px;

    &__btn {
        width: 50%;
        background: $deepCerulean;
        line-height: 30px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background: lighten($deepCerulean, 5%);
        }

        &--active {
            background: darken($deepCerulean, 10%);
            color: darken(#FFF, 10%);

            &:hover {
                background: darken($deepCerulean, 5%);
            }
        }

        &:first-child {
            border-right: 1px solid $aluminium;
        }
    }
}
</style>
