<template>
  <div class="login-container">
    <div class="login-box">
      <!-- <img src="@/assets/bilibili.png" alt="" /> -->
      <el-form
        ref="loginFormRef"
        :v-model="loginForm"
        :rules="rules"
        label-width="100px"
      >
        <!-- 1 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>
              <svg-icon icon-class="yonghu" />
            </template>
          </el-input>
        </el-form-item>
        <!-- 2 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="isPassword ? 'password' : ''"
          >
            <template #prefix>
              <svg-icon icon-class="password" />
            </template>
            <!-- 给组件加原生没效果 加.native -->
            <!-- <template #suffix>
              <SvgIcon
                :name="isPassword ? 'eye' : 'eye-open'"
                @click.native="isPassword = !isPassword"
                @keyup.enter.native="login"
              ></SvgIcon>
              &nbsp;</template
            > -->
          </el-input>
        </el-form-item>
        <!-- 3 -->
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <!-- <el-button type="primary" @click="login">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validateMobile } from '@/utils/validate'
export default {
  filters: {},
  components: {},
  data () {
    // callback() 校验通过
    // callback(new Error) 校验失败
    const validateMobileFn = (rule, value, callback) => {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateMobileFn, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, man: 16, message: '密码长度在6-16之间', trigger: 'blur' }
        ]
      },
      isPassword: true
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        console.log('校验成功')
        // 调用前面ajax数据
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/dashboard')
      } catch (err) {
        // console.log(err)
        // this.$message.error('校验失败')
        this.$message.error(err.message)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("~@/assets/bg.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    margin-left: 300px;
    width: 550px;
    height: 400px;
    text-align: center;
    margin-top: 40px;
    img {
      margin-bottom: 20px;
      width: 450px;
      margin-left: 100px;
    }
    .el-input {
      :deep(input) {
        width: 450px;
        height: 50px;
        // opacity: 0.1;
      }
    }
    .el-button {
      width: 450px;
      height: 64px;
      font-size: 20px;
    }
    //:deep(选择器)
    :deep(.el-form-item__error) {
      color: #fff;
    }
    :deep(.el-form-item.is-error .el-input__inner) {
      border: none;
    }
  }
}
</style>
