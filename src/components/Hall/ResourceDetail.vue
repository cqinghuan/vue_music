<template>
  <div class="phone-box">
    <!-- 顶部歌单信息区域 -->
    <div class="head_channel">
      <a-page-header
        title="歌单"
        :style="{'z-index': 1}"
        @back="() => $router.go(-1)"
      >
        <a-row :gutter="20">
          <a-col :span="10">
            <img :src="resourceDetail.coverImgUrl" alt="">
          </a-col>
          <a-col :span="14">
            <a-card :style="cardStyle" :bordered="false">
              <template slot="title" class="cardHead" :style="headStyle">
                <p :style="headStyle">{{ resourceDetail.name }}</p>
              </template>
              <a-card-meta :title="nickname" class="meta">
                <a-avatar slot="avatar" :src="avatarUrl"/>
              </a-card-meta>
                <p>{{ description }}</p>
            </a-card>
          </a-col>
        </a-row>
      </a-page-header>
      <div class="blur_bg">
        <img :src="resourceDetail.coverImgUrl" alt="">
      </div>
      <div class="blur_bg_gray"></div>
    </div>
    <!-- 歌曲清单区域 -->
    <div class="songsbox">
      <a-list :data-source="resourceDetail.tracks" size="large">
        <a-list-item slot="renderItem" slot-scope="item, index" :key="item.id" @click="gotoSongPlay(item.id)">
          <a-list-item-meta>
            <template slot="description">
              <a>{{ item.ar[0].name + '-' + item.al.name }}</a>
            </template>
            <template slot="title">
              <a>{{ item.name }}</a>
            </template>
            <template slot="avatar">
              <div style="margin-left: 10px;"><a style="color: black; font-size: 24px;">{{ index+1 }}</a></div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      resourceDetail: {},
      headStyle: {
        'word-break': 'break-all !important',
        'word-wrap': 'break-word !important',
        'white-space': 'normal !important',
        'margin-bottom': '-10px'
      },
      nickname: '',
      description: '',
      avatarUrl: '',
      cardStyle: {
        'background': 'none'
      }
    };
  },
  created() {
    this.getResourceDetail();
  },
  mounted() {
    
  },
  methods: {
    async getResourceDetail() {
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: { id: this.id },
      });
      if (res.code !== 200) return
      this.resourceDetail = res.playlist
      console.log(res);
      this.nickname = this.resourceDetail.creator.nickname
      this.description = this.resourceDetail.description
      this.avatarUrl = this.resourceDetail.creator.avatarUrl
    },
    async gotoSongPlay(id) {
      this.$router.push({
        name: 'play',
        params: {
          id
        }
      })
  }
  }
};
</script>

<style lang="less" scoped>
.head_channel {
  height: 300px;
  position: relative;
  overflow: hidden;
}

.head_channel .blur_bg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 0;
  -webkit-filter: blur(5px);
  filter: blur(100px);
  transform: scale(1.2);
}

.head_channel .blur_bg img {
  width: 100%;
  height: 120%;
}

.head_channel .blur_bg_gray {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  background: rgba(0,0,0,.2);
  z-index: -1;
  opacity: 0.5;
}

.ant-card p {
  color: black;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  .cardHead {
    white-space: normal !important;
    overflow: visible !important;
  }
}

.songsbox {
  a {
    font-size: 14px;
  }
}
</style>