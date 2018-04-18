<template lang="pug">
.container
  .topic-wrap
    petalItem(
      v-for="item of petals",
      :petal="item",
      :key="key")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import petalItem from '@/components/petal-item'

export default {
  components: {
    petalItem
  },
  computed: {
    ...mapState([
      'petals'
    ])
  },
  data () {
    return {
      num: 1
    }
  },
  mounted () {
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
  },
  onReachBottom () {
    this.loadmore()
  },
  methods: {
    ...mapActions([
      'getPetals'
    ]),
    async refresh () {
      await this.getPetals(true)
      wx.stopPullDownRefresh()
    },
    loadmore () {
      this.getPetals()
    }
  }
}
</script>

<style lang="less">
.topic-wrap{
	width: 100%;
}
</style>
