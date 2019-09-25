<template>
  <v-app>
<!--    <v-app-bar app>-->
<!--      <v-toolbar-title class="headline text-uppercase">-->
<!--        <span>Vuetify</span>-->
<!--        <span class="font-weight-light">MATERIAL DESIGN</span>-->
<!--      </v-toolbar-title>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn-->
<!--        text-->
<!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--        target="_blank"-->
<!--      >-->
<!--        <span class="mr-2">Latest Release</span>-->
<!--      </v-btn>-->
<!--    </v-app-bar>-->

<!--    <v-content>-->
<!--        <Card />-->
<!--      <HelloWorld class="mt-10"/>-->
<!--    </v-content>-->
      <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './components/Card.vue'
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
      Card,
  },
  data: () => ({
    //
  }),
});
</script>
