<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        <span>课程： xxx</span><br/>
        <span>课程： xxx</span><br/>
        <span>课程： xxx</span><br/>
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input
            type="file"
            ref="video-file"
          >
        </el-form-item>
        <el-form-item>
          <input
            type="file"
            ref="image-file"
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="authUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  transCodeVideo,
  getAliyunTransCodePercent
} from '@/services/aliyun-upload'

export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      uploader: null,
      videoId: null,
      imageUrl: '',
      fileName: ''
    }
  },
  created () {
    this.initUploader()
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        userId: 1618139964448548,
        region: 'cn-shanghai',
        parSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo)
          let uploadAuthInfo = null
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageURL
            uploadAuthInfo = data.data
          } else {
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name
            })
            this.videoId = data.data.videoId
            uploadAuthInfo = data.data
          }

          ;(this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAuthInfo.uploadAuth,
            uploadAuthInfo.uploadAddress,
            uploadAuthInfo.videoId || uploadAuthInfo.imageId
          )
        },
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed')
        },
        onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {
          console.log('')
        },
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired')
        },
        onUploadEnd: async (uploadInfo: any) => {
          const { data } = await transCodeVideo({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName
          })
          console.log(data)

          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            if (data.data === 100) {
              this.$message.success('转码成功')
              window.clearInterval(timer)
            }
            console.log('转码进度', data.data)
          }, 3000)
        }
      })
    },
    authUpload () {
      const videoFile = this.$refs['video-file'].files[0]
      this.uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')
      this.uploader.addFile(this.$refs['image-file'].files[0], null, null, null, '{"Vod":{}}')
      this.fileName = videoFile.name
      this.uploader.startUpload()
    }
  }
})
</script>
