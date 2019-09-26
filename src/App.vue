<template>
  <v-app>
      <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './components/Card.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Card,
  },
  data: () => ({
    //
  }),
});
</script>
