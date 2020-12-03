<template>
  <div class="login">
    <!--
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      el-form-item 绑定prop属性
    -->
    <el-form
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-form"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" :loading="submiting" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      submiting: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      // 表单验证
      // 转换类型(this.$refs['form'] as any)
      this.submiting = true
      try {
        await (this.$refs.form as Form).validate()
        // 验证通过提交表单
        const { data } = await login(this.form)
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   data: qs.stringify(this.form) // axios默认发送的是 application/json格式的数据
        // })
        // 处理请求结果
        // 失败 给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 1. 成功，记录登录状态，状态需要能够全局访问（放到vuex容器中)
          // 2. 在访问需要登录的页面时，判断有没有登录状态（路由拦截器)
          this.$store.commit('setUser', data.content)
          // 成功 - 首页
          this.$message.success('登录成功')
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (e) {
        console.log(e)
      }
      this.submiting = false
    }
  }
})
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 30px 40px;
    border-radius: 10px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
