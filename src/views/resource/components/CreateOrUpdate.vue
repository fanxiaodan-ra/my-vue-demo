<template>
  <div class="create-or-update-resource">
    <el-dialog title="编辑资源" :visible.sync="value">
      <el-form :model="form">
        <el-form-item label="资源名称：" label-width="120px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：" label-width="120px">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类：" label-width="120px">
          <el-select v-model="form.categoryId" placeholder="请选择资源分类">
            <template v-for="(item) in categories">
              <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：" label-width="120px">
          <el-input v-model="form.description" type="textarea"></el-input>
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
import { getAllCategory, saveOrUpdateResource, getResourceById } from '@/services/resource'

export default Vue.extend({
  name: 'CreateOrUpdateResource',
  props: {
    isEdit: {
      type: Boolean
    },
    value: {
      type: Boolean,
      required: true
    },
    resourceId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        url: '',
        categoryId: '',
        description: ''
      },
      categories: []
    }
  },
  created () {
    this.loadCategories()
    this.isEdit && this.loadResourceById()
  },
  methods: {
    async loadCategories () {
      const { data } = await getAllCategory()
      this.categories = data.data
    },
    async loadResourceById () {
      console.log(111)
      const { data } = await getResourceById({
        id: this.resourceId
      })
      console.log(data)
    },
    async onSubmit () {
      console.log(this.form)
      const { data } = await saveOrUpdateResource(this.form)
      this.$message.success('保存成功')
      this.$router.back()
      // this.$emit('input', false)
    }
  }
})
</script>
