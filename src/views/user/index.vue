<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="time">
            <el-date-picker
              v-model="form.time"
              value-format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="loading"
              @click="handleReset"
            >重置</el-button>
            <el-button
              :disabled="loading"
              type="primary"
              @click="onSubmit"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="loading"
        :data="userList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleSelectRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleAllocRole"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'User',
  data () {
    return {
      userList: [],
      form: {
        phone: '',
        time: [],
        startCreateTime: '',
        endCreateTime: ''
      },
      dialogVisible: false,
      roles: [],
      currentRole: null,
      roleIdList: [],
      loading: true
    }
  },
  created () {
    this.loadUserList()
  },
  methods: {
    async loadUserList () {
      this.loading = true
      const { time } = this.form
      if (time && time.length) {
        this.form.startCreateTime = time[0]
        this.form.endCreateTime = time[1]
      } else {
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      }
      const { data } = await getUserPages(this.form)
      this.userList = data.data.records
      this.loading = false
    },
    async handleSelectRole (role: any) {
      this.dialogVisible = true
      this.currentRole = role
      const { data } = await getAllRoles()
      this.roles = data.data

      const { data: { data: userRoles } } = await getUserRoles((this.currentRole as any).id)
      this.roleIdList = userRoles.map((item: any) => item.id)
    },
    onSubmit () {
      // this.filterParams.currentPage = 1
      this.loadUserList()
    },
    handleReset () {
      (this.$refs.form as Form).resetFields()
      this.loadUserList()
    },
    async handleAllocRole () {
      console.log(this.roleIdList)
      await allocateUserRoles({
        userId: (this.currentRole as any).id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
})
</script>
