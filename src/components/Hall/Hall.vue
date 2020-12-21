<template>
  <div>
    <a-carousel autoplay>
      <div v-for="item in bannerList" :key="item.bannerId">
        <img :src="item.pic" alt="">
      </div>
    </a-carousel>
    <a-card title="Recommended For You" :headStyle="cardStyle" :bodyStyle="cardStyle" :style="cardStyle" class="recommend">
      <a-card-grid style="width:33.3%;text-align:center" v-for="item in recourceList" :key="item.id">
        <a-card :bordered="false" :style="cardStyle" @click="gotoResourceDetail(item.id)">
          <img slot="cover" :src="item.picUrl"/>
          <p>{{ item.name }}</p>
        </a-card>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [],
      cardStyle: {
        'color': '#FFF',
        'background-color': '#00182E',
        'border': 'none'
      },
      recourceList: []
    }
  },
  created() {
    this.getBanner()
    this.getRecommendResource()
  },
  methods: {
    async getBanner() {
      const { data: res } = await this.$http.get('/banner?type=2')
      if (res.code !== 200) return
      this.bannerList = res.banners
    },
    async getRecommendResource() {
      const { data: res } = await this.$http.get('/recommend/resource')
      if (res.code !== 200) return
      console.log(res.recommend);
      this.recourceList = res.recommend.slice(0, 6)
    },
    gotoResourceDetail(id) {
      console.log(id);
      
      this.$router.push({
        name: 'resourcedetail',
        params: {
          id
        }
      })
    }
  }
};
</script>

<style lang="less" scoperd>
.ant-carousel {
  background-color: #00182E;
}

.ant-card-grid {
  box-shadow: none !important;
}

.recommend {
  .ant-card p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; 
    color: #FFF;
    height: 42px;
  }
}
</style>