<template>
  <div class="login">
    <div class="loginbox" v-show="!isNumLogin">
      <div class="logo">
        <img src="~assets/img/logo-a.png" alt="" />
      </div>
      <div class="name">NICEMUSIC</div>
      <el-form :model="formData" :rules="rules" ref="loginForm">
        <el-form-item prop="phone">
          <div class="phone">
            <el-input
              v-model="formData.phone"
              placeholder="请输入网易云音乐手机号"
              prefix-icon="iconfont icon-shoujihao"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="password">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              show-password
              prefix-icon="iconfont icon-mima"
              style="margin-top: 10px"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="submit" @click="formSubmit('loginForm')">登录</div>
        </el-form-item>
        <div class="numlogin" @click="changeCLick">验证码登录</div>
      </el-form>
    </div>
    <div class="loginbox" v-show="isNumLogin">
      <div class="logo">
        <img src="~assets/img/logo-a.png" alt="" />
      </div>
      <div class="name">NICEMUSIC</div>
      <el-form :model="formData" :rules="rules" ref="numLoginForm">
        <el-form-item prop="phone">
          <div class="phone">
            <el-input
              v-model="formData.phone"
              placeholder="请输入网易云音乐手机号"
              prefix-icon="iconfont icon-shoujihao"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="numpassword">
          <div class="password">
            <el-input
              v-model="formData.numpassword"
              type="text"
              placeholder="请输入验证码"
              prefix-icon="iconfont icon-mima"
              style="margin-top: 10px"
            >
              <template slot="append">
                <div @click="sendNum" v-if="!isSend">发送验证码</div>
                <div v-else>{{ resendTime }}s后可再次发送</div>
              </template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="submit" @click="numformSubmit('numLoginForm')">登录</div>
        </el-form-item>
        <div class="numlogin" @click="changeCLick">密码登录</div>
      </el-form>
    </div>
  </div>
</template>

<script >
import {
  startLogin,
  refreshLogin,
  getUserDetail,
  SendNum,
  startNumLogin,
} from "network/login.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      isNumLogin: false,
      isSend: false,
      resendTime: 60,
      formData: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          {
            required: true,
            message: "你不会连手机号都没有吧",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码还没输入呢",
            trigger: "blur",
          },
          {
            min: 6,
            max: 18,
            message: "密码格式错误，只能是6到18位",
            trigger: "blur",
          },
        ],
        numpassword: [
          {
            required: true,
            message: "验证码还没输入呢",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["isLogin", "profile"]),
  },
  created() {
    console.log(this.isLogin);
  },

  methods: {
    formSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.startLogin();
        } else {
          this.$message.error("表单验证失败");
        }
      });
    },
    numformSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.startNumLogin();
        } else {
          this.$message.error("表单验证失败");
        }
      });
    },
    startLogin() {
      startLogin(this.formData.phone, this.formData.password).then((res) => {
        if (res && res.code === 200) {
          console.log(res);
          this.setLogin(res.profile);
          refreshLogin();
          setTimeout(() => {
            this.getSiginStatus();
            this.$message.success("登陆成功");
            this.$router.push("/");
          }, 200);
        } else {
          this.$message.error("密码错误");
        }
      });
    },
    startNumLogin() {
      startNumLogin(this.formData.phone, this.formData.numpassword).then(
        (res) => {
          if (res && res.code === 200) {
            startLogin(this.formData.phone, "", this.formData.numpassword).then(
              (res) => {
                if (res && res.code === 200) {
                  console.log(res);
                  this.setLogin(res.profile);
                  refreshLogin();
                  setTimeout(() => {
                    this.getSiginStatus();
                    this.$message.success("登陆成功");
                    this.$router.push("/");
                  }, 200);
                } else {
                  this.$message.error("验证码错误");
                }
              }
            );
            console.log(res);
            this.setLogin(res.profile);
            refreshLogin();
            setTimeout(() => {
              this.getSiginStatus();
              this.$message.success("登陆成功");
              this.$router.push("/");
            }, 200);
          } else {
            this.$message.error("验证码错误");
          }
        }
      );
    },
    getSiginStatus() {
      getUserDetail(this.profile.userId).then((res) => {
        if (res) {
          console.log(res.pcSign);
          this.setDailyStatus(res.pcSign);
        }
      });
    },
    changeCLick() {
      this.isNumLogin = !this.isNumLogin;
      this.formData = {};
      this.$refs.loginForm.resetFields();
      this.$refs.numLoginForm.resetFields();
    },
    sendNum() {
      if (this.formData.phone) {
        this.resendTime = 60;
        this.isSend = true;
        setInterval(() => {
          this.resendTime--;
          if (this.resendTime === 0) {
            this.isSend = false;
          }
        }, 1000);
        SendNum(this.formData.phone);
      } else {
        this.$message.error("请先输入手机号");
      }
    },
    ...mapMutations(["setLogin", "setDailyStatus"]),
  },
};
</script>

<style lang="less" scoped>
.numlogin {
  cursor: pointer;
  margin-top: 15px;
  padding-right: 10px;
  float: right;
}
.numlogin:hover {
  color: #5dd5c8;
}
.el-input__inner:focus {
  border: 1px solid #dcdfe6;
  outline: none;
}
.el-form-item /deep/ .el-form-item__error {
  margin-left: 30px;
}
.icon-shoujihao {
  font-size: 15px;
}
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #5dd5c8;
  background-image: url("~assets/img/newbg1.png");
  background-position: center;
  background-repeat: no-repeat;
  .loginbox {
    position: absolute;
    width: 345px;
    height: 490px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.3);
    background-image: url("~assets/img/logbg.jpg");
    background-position: bottom;
    background-repeat: no-repeat;
    .logo {
      margin: 50px auto 0;
      width: 55px;
      height: 55px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .name {
      text-align: center;
      color: #4a4a4a;
      margin-bottom: 50px;
    }
    .phone,
    .password {
      padding: 0 25px;
    }
    .password {
      margin: 15px 0 0 0;
    }
    .submit {
      margin: 30px 25px 0;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      background-color: #5dd5c8;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>