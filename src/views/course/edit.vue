<template>
  <div class="course-edit">
    <create-or-update
      is-edit
      :course-id="courseId"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'
export default Vue.extend({
  components: { CreateOrUpdate },
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>
