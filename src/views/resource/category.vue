<template>
  <div class="category">
    <el-card>
      <div slot="header">
        <el-button @click="handleAdd">添加</el-button>
      </div>
      <el-table
        :data="categories"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <create-or-update-category
      :isEdit="isEdit"
      :category="category"
      v-if="dialogFormVisible"
      v-model="dialogFormVisible" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllCategory } from '@/services/resource'
import CreateOrUpdateCategory from './components/CreateOrUpdateCategory.vue'

export default Vue.extend({
  name: 'ResourceCategory',
  components: { CreateOrUpdateCategory },
  data () {
    return {
      categories: [],
      isEdit: false,
      dialogFormVisible: false,
      category: null
    }
  },
  created () {
    this.loadCategories()
  },
  methods: {
    async loadCategories () {
      const { data } = await getAllCategory()
      this.categories = data.data
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.isEdit = false
    },
    handleEdit (item: any) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.category = item
      console.log(item)
    }
  }
})
</script>
