<template>
  <div class="create-or-update">
    <el-card>
      <div slot="header">
        {{id ? '编辑广告' : '添加广告'}}
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" prop="spaceId">
          <el-select v-model="form.spaceId" placeholder="请选择活动区域">
            <template v-for="item in spaces">
              <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="上线/下线" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">上线</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片" prop="img">
          <el-progress
            type="circle"
            v-if="isUploading"
            :width="178"
            :percentage="percentage"
            :status="percentage === 100 ? 'success' : undefined"></el-progress>
          <el-upload
            action="#"
            v-else
            list-type="picture-card"
            :auto-upload="true"
            :http-request="handleUpload"
          >
            <img
              class="el-upload-list__item-thumbnail"
              v-if="form.img"
              width="178"
              :src="form.img"
              alt=""
            >
            <i v-else slot="default" class="el-icon-plus" ></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="广告链接" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注" prop="text">
          <el-input type="textarea" v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import { getAllSpaces, uploadImg, saveOrUpdateAd, getAdById } from '@/services/advert'

export default Vue.extend({
  name: 'CreateOrUpdateAd',
  props: {
    id: [String, Number],
    isEdit: {
      type: Boolean
    }
  },
  data () {
    return {
      form: {
        name: '',
        text: '',
        img: '',
        link: '',
        sort: 0,
        spaceId: null,
        startTime: '',
        endTime: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      spaces: [],
      percentage: 0,
      isUploading: false
    }
  },
  created () {
    this.loadSpaces()
    if (this.isEdit) {
      this.loadAdById()
    }
  },
  methods: {
    async loadSpaces () {
      const { data } = await getAllSpaces()
      this.spaces = data.content
    },
    async loadAdById () {
      const { data } = await getAdById(this.id)
      const { name, text, img, link, sort, spaceId, startTime, endTime } = data.content
      this.form = {
        name,
        text,
        img,
        link,
        sort,
        spaceId,
        startTime,
        endTime
      }
    },
    async onSubmit () {
      const { data } = await saveOrUpdateAd(this.form)
      if (data.state === 1) {
        this.$message.success('保存成功')
        this.$router.back()
      }
    },
    handleReset () {
      (this.$refs.form as Form).resetFields()
    },
    async handleUpload (options: any) {
      this.percentage = 0
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      console.log(options.file)
      console.log(fd)
      const { data } = await uploadImg(fd, (e: any) => {
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      console.log(data)
      this.form.img = data.content.name
      this.isUploading = false
    }
  }
})
</script>
<style lang="scss" scoped>
  ::v-deep .el-upload {
    overflow: hidden;
  }
</style>
