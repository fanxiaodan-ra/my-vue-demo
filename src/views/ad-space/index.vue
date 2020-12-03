<template>
  <div class="ad-space">
    <List/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import List from './components/List.vue'

export default Vue.extend({
  name: 'ad-space',
  components: { List }
})
</script>
