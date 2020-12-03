<template>
  <div class="create-and-update-space">
    <el-card>
      <div slot="header">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="广告位名称" label-width="150px" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import { getSpaceById, saveOrUpdateSpace } from '@/services/advert'

export default Vue.extend({
  name: 'CreateAndUpdateSpace',
  props: {
    isEdit: {
      type: Boolean
    },
    id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.isEdit && this.loadSpaceById()
  },
  methods: {
    async loadSpaceById () {
      const { data } = await getSpaceById(this.id)
      this.form = data.content
    },
    async onSubmit () {
      await saveOrUpdateSpace(this.form)
      this.$message.success('保存成功')
      this.$router.back()
    },
    handleReset () {
      ;(this.$refs.form as Form).resetFields()
    }
  }
})
</script>
