<template>
  <div>
    <div class="d-flex wrapper mx-auto">
      <Search class="mt-10"/>
      <LanguageSwitcher />
    </div>
    <Card class="mt-8" />
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import Search from '../components/Search.vue';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

export default {
  name: 'Home',
  components: {
    Card,
    Search,
    LanguageSwitcher,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 900px;
  position: relative;
}
</style>
