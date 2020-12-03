<template>
  <div class="course-create">
    <create-or-update/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from '../../../../../../../../Downloads/3-6/3-6-3-用户和权限/code/edu-boss-fed/src/views/role/components/CreateOrEdit.vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: { CreateOrUpdate }
})
</script>
    CreateOrEdit
