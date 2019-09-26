<template>
  <div>
    <Search></Search>
    <Card class="mt-8"></Card>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import Search from '../components/Search.vue';

export default {
  name: 'Home',
  components: {
    Card,
    Search,
  },
};
</script>
