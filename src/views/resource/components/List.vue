<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset">重置</el-button>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="loading"
            >查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns">
        <el-button @click="handleAdd">添加</el-button>
        <el-button @click="$router.push({ name: 'resource-category' })">资源分类</el-button>
      </div>
      <el-divider></el-divider>
      <el-table
        :data="resource"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px">
        <el-table-column
          type="index"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="loading"
      ></el-pagination>
    </el-card>
    <CreateOrUpdate
      :isEdit="isEdit"
      :resourceId="resourceId"
      v-if="dialogFormVisible"
      v-model="dialogFormVisible"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
import CreateOrUpdate from './CreateOrUpdate.vue'

export default Vue.extend({
  name: 'ResourceList',
  components: { CreateOrUpdate },
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      resource: [],
      totalCount: 0,
      resourceCategories: [],
      loading: true,
      dialogFormVisible: false,
      isEdit: false,
      resourceId: null
    }
  },
  created () {
    this.loadResource()
    this.loadResourceCategories()
  },
  methods: {
    async loadResource () {
      this.loading = true
      const { data } = await getResourcePages(this.form)
      this.resource = data.data.records
      this.totalCount = data.data.total
      this.loading = false
    },
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    onSubmit () {
      this.form.current = 1
      this.loadResource()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResource()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResource()
    },
    handleEdit (item: any) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.resourceId = item.id
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.isEdit = false
    }
  }
})
</script>
<style lang="scss" scoped></style>
