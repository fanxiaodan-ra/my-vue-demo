<template>
  <div class="alloc-menu">
    <el-card>
      <h1>分配菜单</h1>
      <el-tree
        ref="menu-tree"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        default-expand-all
        show-checkbox
      ></el-tree>
      <div class="btns">
        <el-button @click="resetChecked">清空</el-button>
        <el-button @click="onSave" type="primary">提交</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: [String, Number]
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenuNode()
    this.loadCheckedNode()
  },
  methods: {
    async loadMenuNode () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async loadCheckedNode () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      console.log(menuIdList)
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
