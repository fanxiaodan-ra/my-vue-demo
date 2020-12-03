<template>
  <div class="create-or-update-category">
    <el-dialog title="编辑资源" :visible.sync="value">
      <el-form :model="form">
        <el-form-item label="名称：" label-width="120px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：" label-width="120px">
          <el-input-number v-model="form.sort"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('input', false)">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateCategory } from '@/services/resource'

export default Vue.extend({
  name: 'CreateOrUpdateCategory',
  props: {
    isEdit: {
      type: Boolean
    },
    value: {
      type: Boolean,
      required: true
    },
    category: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        sort: ''
      },
      categories: []
    }
  },
  created () {
    if (this.isEdit && this.category) {
      const { id, name, sort } = this.category
      this.form = { id, name, sort }
    }
  },
  methods: {
    async onSubmit () {
      await saveOrUpdateCategory({ resourceCategoryForm: this.form })
      this.$message.success('保存成功')
      this.$emit('input', false)
    }
  }
})
</script>
