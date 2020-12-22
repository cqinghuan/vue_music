<template>
  <div class="phone-box">
    <div class="content-box">
      <a-page-header title=" " @back="() => $router.go(-1)" />
      <div class="pic" :style="{ 'animation-play-state': isPlay ? 'running' : 'paused' }" >
        <img :src="songInfo.picUrl" alt="" />
      </div>
      <audio
        :src="songInfo.src"
        ref="audioRef"
        autoplay
        @timeupdate="autoChanged"
        @canplay="initAudio"
        @play="() => { this.isPlay = true }"
        @pause ="() => { this.isPlay = false }"
      ></audio>
      <div class="control">
        <a-slider
          v-model="percent"
          @afterChange="progressChanged"
          :marks="marks"
          :tip-formatter="formatter"
        />
        <a-row>
          <a-col :span="8"><a-icon type="step-backward" /></a-col>
          <a-col :span="8"><a-icon :type="!isPlay ? 'caret-right' : 'pause'" @click="controlPlay"/></a-col>
          <a-col :span="8"><a-icon type="step-forward" /></a-col>
        </a-row>
      </div>
    </div>
    <div class="blur-bg">
      <img :src="songInfo.picUrl" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      songInfo: {
        id: this.$store.state.songId,
        src: '',
        picUrl: '',
        name: ''
      },
      percent: 0,
      marks: {
        0: '0',
        100: ''
      },
      isPlay: false
    };
  },
  created() {
    this.getSongUrl();
    this.getSongDetail()
  },
  computed: {
    ...mapState(['songListId', 'songId'])
  },
  methods: {
    async getSongUrl() {
      const { data: res } = await this.$http.get('/song/url', { params: { id: this.songInfo.id} });
      console.log(res);
      if (res.code !== 200) return
      this.songInfo.src = res.data[0].url
    },
    async getSongDetail() {
      const { data: res } = await this.$http.get('/song/detail', { params: { ids: this.songInfo.id} });
      console.log(res);
      this.songInfo.picUrl = res.songs[0].al.picUrl
      this.songInfo.name = res.songs[0].name
    },
    initAudio() {
      this.marks['100'] = this.formatSeconds(this.$refs.audioRef.duration)
      this.isPlay = true
    },
    autoChanged() {
      this.percent = this.$refs.audioRef.currentTime * 100 / this.$refs.audioRef.duration
    },
    progressChanged(precent) {
      this.$refs.audioRef.currentTime = this.$refs.audioRef.duration * precent / 100
    },
    controlPlay() {
      if (this.isPlay) {
        this.$refs.audioRef.pause()
      } else {
        this.$refs.audioRef.play()
      }
    },
    formatter(precent) {
      return this.formatSeconds(precent / 100 * this.$refs.audioRef.duration)
    },
    formatSeconds(second){
      var s = parseInt(second);// 需要转换的时间秒 
      var m = 0;// 分 
      if(s > 60) { 
        m = parseInt(s/60);
        s = parseInt(s%60);
      }
      var ss ,mm;
      if (s > 0) {
        ss = s.toString().length >= 2 ? s.toString() : "0" + s.toString() ;
      } else {
        ss="00";
      }
      if (m > 0) { 
        mm = m.toString().length >= 2 ? m.toString() : "0" + m.toString();
      } else {
        mm = "00"
      }
      var result = mm + ":" + ss;
      return result; 
    }
  },
};
</script>

<style lang="less" scoped>
@keyframes ronate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.content-box {
  height: 100%;

  .pic {
    width: 350px;
    height: 350px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    animation: ronate 20s linear 0.2s infinite;
  }

  .control {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 75%;
    
    .ant-col {
      text-align: center;
      font-size: 40px;
    }
  }
}

.blur-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  -webkit-filter: blur(5px);
  filter: blur(100px);
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
  }
}

*::selection {
  background: none;
}
</style>