<template>
  <div id="editor">
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'
export default Vue.extend({
  name: 'Editor',
  props: {
    value: {
      type: String
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E('#editor')
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        insertImgFn(data.data.name)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
})
</script>
