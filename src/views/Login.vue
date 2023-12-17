<template>
  <div>
    <div class="login">
      <div class="box">
        <h2>后台管理系统</h2>
        <div class="loginForm">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="name">
              <i class="el-icon-user"></i>
              <el-input
                v-model="loginForm.name"
                placeholder="账号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <div
                @click="showPass = !showPass"
                style="float: left; cursor: pointer"
              >
                <i class="el-icon-lock" v-show="!showPass"></i>
                <i class="el-icon-unlock" v-show="showPass"></i>
              </div>
              <div style="float: left">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  placeholder="密码"
                  autocomplete="off"
                  v-show="!showPass"
                  @keyup.enter.native="submitForm('loginForm')"
                ></el-input>
                <el-input
                  type="text"
                  v-model="loginForm.password"
                  placeholder="密码"
                  autocomplete="off"
                  v-show="showPass"
                  @keyup.enter.native="submitForm('loginForm')"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      showPass: false,
      loginForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 4, max: 10, message: "账号为4-10位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 12, message: "密码长度为4-12位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/login", {
          params: {
            loginData: this.loginForm,
          },
        })
        .then((res) => {
          console.log(res);
          const { code, message, token } = res.data;
          if (code === 200) {
            window.sessionStorage.setItem("token", JSON.stringify(token));
            this.$router.push("/home");
            this.$message({
              message: message,
              type: "success",
            });
          } else {
            alert(message);
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
          console.log("success login!!");
        } else {
          console.log("error login!!");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  /*背景图片*/
  background-image: url("../assets/image/login_bg.png");
  position: fixed;
  background-size: cover;
}

.box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  height: 300px;
  margin: auto;
  border: 1px solid #316ed6;
  background-color: rgba(0, 0, 0, 0.2);
}

.box h2 {
  padding: 20px 0 20px 0;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  line-height: 30px;
  color: aliceblue;
}

.el-form .el-form-item i {
  width: 50px;
  color: aliceblue;
}

.el-form .el-form-item .el-input {
  width: 250px;
}

.el-form .el-form-item .el-button {
  width: 300px;
  background: #505458;
}
</style>
