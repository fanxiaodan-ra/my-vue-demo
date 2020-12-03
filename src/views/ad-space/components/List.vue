<template>
  <div class="space-list">
    <el-card>
      <div slot="header">
        <el-button @click="handleAdd">添加广告位</el-button>
      </div>
      <el-table
        :data="spaceList"
        style="width: 100%">
        <el-table-column
          width="100"
          prop="spaceKey"
          label="spaceKey">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告位名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert'

export default Vue.extend({
  name: 'SpaceList',
  data () {
    return {
      spaceList: []
    }
  },
  created () {
    this.loadSpaceList()
  },
  methods: {
    async loadSpaceList () {
      const { data } = await getAllSpaces()
      this.spaceList = data.content
      console.log(data)
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'advert-space-edit',
        params: {
          id: item.id
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'advert-space-create'
      })
    }
  }
})
</script>
