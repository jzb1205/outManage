<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">外包信息管理</h3>
      </div>

      <el-form-item prop="userName">
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="用户名"
          name="userName"
          type="text"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateuserName = (rule, value, callback) => {
      if (!value && !(value.trim())) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码长度不能低于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      loginRules: {
        userName: [
          { required: true, trigger: "blur", validator: validateuserName },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },
  mounted() {
    if (this.loginForm.userName === "") {
      this.$refs.userName.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login()
        } else {
      console.log(this.$api)
          return false;
        }
      });
    },
    //登录
    login(){
      sessionStorage.clear()
      this.$post(this.$api.login.login,this.loginForm).then(res=>{
        if (res.code === '000') {
          sessionStorage.setItem('userInfo',JSON.stringify(res.data.userInfo))
          sessionStorage.setItem('token',JSON.stringify(res.data.token))
          this.$router.push("/")
          // this.getMenuList()
        }
      })
    },
    //获取菜单
    getMenuList(){
      this.$post(this.$api.login.getMenuList).then(res=>{
        if (res.code === '000') {
        }
      })
    }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
