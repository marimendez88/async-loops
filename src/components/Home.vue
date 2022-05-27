<template>
  <h1>MJ Test</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { axiosService } from '../services/axios.service';
export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const _axios = new axiosService();
    _axios.getAxiosCall('');
  },
});
</script>

<style scoped lang="scss"></style>
