<template>
  <div class="advert">
    <el-card>
      <div slot="header">
        <el-button @click="handleAdd">添加广告</el-button>
      </div>
      <el-table
        :data="advList"
        style="width: 100%">
        <el-table-column
          prop="id"
          width="60"
          label="id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称">
        </el-table-column>
        <el-table-column
          prop="space"
          label="广告位置">
        </el-table-column>
        <el-table-column
          label="广告图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" width="100"/>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="300"
        >
          <template slot-scope="scope">
            <div> 开始时间：{{scope.row.startTimeFormatString}}</div>
            <div> 结束时间：{{scope.row.endTimeFormatString}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="上线/下线">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :inactive-value="0"
              :active-value="1"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
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
import { getAdList, getAllSpaces } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertIndex',
  data () {
    return {
      advList: [],
      spaces: []
    }
  },
  created () {
    this.loadAdvList()
  },
  methods: {
    async loadAdvList () {
      const { data } = await getAdList()
      const { data: spaces } = await getAllSpaces()
      const adList = data.content
      const spaceList = spaces.content
      adList.map((item: any) => {
        item.space = spaceList[item.spaceId] ? spaceList[item.spaceId].name : ''
      })
      this.advList = data.content
    },
    handleAdd () {
      this.$router.push({
        name: 'advert-create'
      })
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'advert-edit',
        params: { id: item.id }
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
