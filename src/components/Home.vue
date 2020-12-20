<template>
  <a-layout>
    <a-layout-content>
        <router-view></router-view>
    </a-layout-content>
    <a-layout-footer>
      <a-row ref="rowRef">
        <a-col :span="6" @click="activePath = 'hall'" :class="activePath == 'hall' ? 'activePath' : ''">
          <a-icon type="home"></a-icon>
          <p>Home</p>
        </a-col>
        <a-col :span="6" @click="activePath = 'search'" :class="activePath == 'search' ? 'activePath' : ''">
          <a-icon type="search"></a-icon>
          <p>Search</p>
        </a-col>
        <a-col :span="6" @click="activePath = 'list'" :class="activePath == 'list' ? 'activePath' : ''">
          <a-icon type="ordered-list"></a-icon>
          <p>Playlist</p>
        </a-col>
        <a-col :span="6" @click="activePath = 'account'" :class="activePath == 'account' ? 'activePath' : ''">
          <a-icon type="user"></a-icon>
          <p>Account</p>
        </a-col>
      </a-row>
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      bodyStyle: {
        padding: 0,
      },
      activePath: 'hall'
    };
  },
  created() {
    // this.getAccountInfo()
  },
  methods: {
    async getAccountInfo() {
      const { data: res } = await this.$http.get("/user/account");
      console.log(res);
    },
  },
  watch: {
      activePath(value) {
          this.$router.push(`/${value}`)
      }
  }
};
</script>

<style lang="less" scoped>
.ant-layout-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 0;
  background-color: #002337;

  .ant-col {
    color: #ffffff;
    text-align: center;
    i {
      margin-top: 7px;
      font-size: 30px;
    }
    p {
      margin: 0;
    }
  }
}
.activePath {
    color: #0192A9 !important;
}
</style>