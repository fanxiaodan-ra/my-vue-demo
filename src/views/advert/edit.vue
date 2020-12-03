<template>
  <div class="advert-create">
    <create-or-update :isEdit="true" :id="id"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'AdvertCreate',
  components: { CreateOrUpdate },
  props: {
    id: [String, Number]
  }
})
</script>
