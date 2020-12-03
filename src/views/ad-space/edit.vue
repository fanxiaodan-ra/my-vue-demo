<template>
  <div class="space-create">
    <CreateAndUpdate :isEdit="true" :id="id"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateAndUpdate from './components/CreateAndUpdate.vue'
export default Vue.extend({
  name: 'SpaceEdit',
  props: {
    id: {
      type: [String, Number]
    }
  },
  components: { CreateAndUpdate }
})
</script>
