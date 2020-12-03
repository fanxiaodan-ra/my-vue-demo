<template>
  <div class="space-create">
    <CreateAndUpdate :isEdit="false"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateAndUpdate from './components/CreateAndUpdate.vue'
export default Vue.extend({
  name: 'SpaceCreate',
  components: { CreateAndUpdate }
})
</script>
