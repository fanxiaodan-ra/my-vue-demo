<template>
  <div class="course-section">
    <el-card>
      <div class="card-header" slot="header">
        {{ course.courseName }}
        <el-button
          type="primary"
          @click="handleShowAddSection"
        >添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleSort"
      >
        <div class="inner" slot-scope="{node, data}">
          <span>
            {{node.label}}
          </span>
          <span class="actions">
            <template v-if="data.sectionName">
              <el-button @click.stop="handleEditSectionShow(data)">编辑</el-button>
              <el-button
                type="primary"
                @click.stop="handleShowAddLesson(data)"
              >添加课时</el-button>
              <el-select
                class="select-status"
                v-model="data.status"
                placeholder="请选择"
                @change="handleSectionStatusChange(data)"
              >
                <el-option label="已隐藏" :value="0" />
                <el-option label="待更新" :value="1" />
                <el-option label="已更新" :value="2" />
              </el-select>
            </template>
            <template v-else>
              <el-button @click="handleShowEditLesson(data, node.parent.data)">编辑</el-button>
              <el-button type="success" @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  sectionId: node.parent.id,
                  lessonId: data.id
                }
              })">上传视频</el-button>
              <el-select
                class="select-status"
                v-model="data.status"
                placeholder="请选择"
                @change="handleLessonStatusChange(data)"
              >
                <el-option label="已隐藏" :value="0" />
                <el-option label="待更新" :value="1" />
                <el-option label="已更新" :value="2" />
              </el-select>
            </template>
          </span>
        </div>
      </el-tree>
    </el-card>
    <!-- 添加阶段 -->
    <el-dialog
      title="添加课程阶段"
      :visible.sync="isAddSectionShow"
    >
      <el-form ref="section-form" :model="section" label-width="70px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="section.sectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" prop="description">
          <el-input v-model="section.description" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" prop="orderNum">
          <el-input-number v-model="section.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddSectionShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSection">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加阶段 -->
    <!-- 添加课时 -->
    <el-dialog
      title="添加课时"
      :visible.sync="isAddLessonShow"
    >
      <el-form ref="lesson-form" :model="lesson" label-width="100px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input :value="lesson.sectionName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课时名称" prop="sectionName">
          <el-input v-model="lesson.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="description">
          <el-input v-model.number="lesson.duration" type="number" autocomplete="off">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否开放试听" prop="description">
          <el-switch v-model="lesson.isFree"></el-switch>
        </el-form-item>
        <el-form-item label="课时排序" prop="description">
          <el-input-number v-model="lesson.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLesson">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加课时 -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getSectionAndLesson, saveOrUpdateSection, getSectionById } from '@/services/course-section'
import { saveOrUpdateLesson } from '@/services/course-lesson'
export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [Number, String]
    }
  },
  data () {
    const defaultProps = {
      children: 'lessonDTOS',
      label (data: any) {
        return data.sectionName || data.theme
      }
    }
    const section = {
      courseId: this.courseId,
      sectionName: '',
      description: '',
      orderNum: 0,
      status: 0
    }
    const lesson = {
      courseId: this.courseId,
      sectionId: undefined,
      sectionName: '',
      theme: '',
      duration: 0,
      isFree: false,
      orderNum: 0,
      status: 0
    }
    return {
      course: {},
      sections: [],
      defaultProps,
      isAddSectionShow: false,
      section,
      isAddLessonShow: false,
      lesson,
      isLoading: false
    }
  },
  created () {
    this.loadCourseAndLesson()
  },
  methods: {
    async loadCourseAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      console.log(data)
      this.sections = data.data
    },
    handleShowAddSection () {
      this.section = { // 防止数据还是编辑时获取的数据
        courseId: this.courseId,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      }
      this.isAddSectionShow = true
    },
    async handleAddSection () {
      const { data } = await saveOrUpdateSection(this.section)
      console.log(data)
      this.loadCourseAndLesson()
      this.isAddSectionShow = false
      ;(this.$refs['section-form'] as Form).resetFields()
      this.$message.success('操作成功')
    },
    handleShowAddLesson (data: any) {
      this.lesson = {
        sectionName: data.sectionName,
        sectionId: data.id,
        courseId: this.courseId,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      }
      this.isAddLessonShow = true
    },
    async handleSectionStatusChange (section: any) {
      await saveOrUpdateSection(section)
      this.$message.success('操作成功')
    },
    async handleLessonStatusChange (lesson: any) {
      await saveOrUpdateLesson(lesson)
      this.$message.success('操作成功')
    },
    handleShowEditLesson (lesson: any, section: any) {
      this.lesson = lesson
      this.lesson.sectionName = section.sectionName
      this.isAddLessonShow = true
    },
    async handleEditSectionShow (section: any) {
      const { data } = await getSectionById(section.id)
      this.section = data.data
      this.isAddSectionShow = true
    },
    async handleAddLesson () {
      await saveOrUpdateLesson(this.lesson)
      this.$message.success('操作成功')
      this.loadCourseAndLesson()
      this.isAddLessonShow = false
    },
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort (dragNode: any, dropNode: any, type: any, event: any) {
      this.isLoading = true
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (err) {
        console.log(err)
        this.$message.error('排序失败')
      }
      this.isLoading = false
    }
  }
})
</script>
<style lang="scss" scoped>
.inner {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
.select-status {
  max-width: 100px;
  margin-left: 8px;
}
</style>
