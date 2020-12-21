<template>
  <div class="login-container phone-box">
    <a-form-model :model="loginForm" class="login-form" :rules="loginRules" ref="loginRef">
      <a-form-model-item prop="username">
        <a-input placeholder="Username" v-model="loginForm.username"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input type="password" placeholder="Password" v-model="loginForm.password"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="login">Login</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    let usernameValidate = (rule, value, callback) => {
        let regexp = /^1[3|4|5|7|8][0-9]{9}$/
        if (value === '') {
        callback(new Error('Please input your Username'));
      } else if (!regexp.test(value)) {
        callback(new Error("Please enter the correct Username format"));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
          username: [{ validator: usernameValidate, trigger: 'change' }],
          password: [{ required: true, message: 'Please input Password', trigger: 'change' }]
      }
    };
  },
  created() {},
  methods: {
    login() {
        this.$refs.loginRef.validate(async valid => {
            if (!valid) return
            let Data = {
                phone: this.loginForm.username,
                password: this.loginForm.password
            }
            const { data: res } = await this.$http.post('/login/cellphone', Data)
            
            console.log(res);
            if (res.code !== 200) return alert(res.msg)
            window.sessionStorage.setItem('token', res.token)
            this.$router.push('/home')
            
        })
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: url("../assets/img/login-bg.jpg") no-repeat;
  background-size: 100%;

  .login-form {
    width: 100%;
    position: absolute;
    bottom: 20%;

    .ant-input {
      background: rgba(255, 255, 255, 0) !important;
      height: 75px;
      border: none;
      font-size: 30px;
      text-align: center;
      color: aliceblue;
    }
  }
}
</style>