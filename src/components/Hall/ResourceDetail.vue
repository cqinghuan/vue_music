<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  created() {
    this.getResourceDetail()
  },
  methods: {
    async getResourceDetail() {
      const { data: res } = await this.$http.get('/playlist/detail', { params: { id: this.id } })
      console.log(res);
      
    }
  }
}
</script>

<style>

</style>