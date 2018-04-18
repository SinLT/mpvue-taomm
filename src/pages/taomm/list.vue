<template lang="pug">
.container-tao
  scroll-view(class="swiper-tab", scroll-x, style="width: 100%", :scroll-left=scrollleft)
    .swiper-tab-item(v-for="(item,index) in TaommNav",:key="index", :style="menuStyle", :data-current="index", @tap="swichNav") {{item}}
    .block(:style="style")
  swiper(:current="currentTab", :style="'height:'+contentHeight", class="swiper-box", duration="300", @change="swiperChange")
    swiper-item(v-for="(item,index1) in TaommNav",:key="index1")
      .content(v-if="index1==currentTab")
        scroll-view(scroll-y, style="height:100%;", @scroll="scrollFn", @scrolltolower="toLow", @scrolltoupper="test")
          .taommq(v-for="(item,key) in taommlists",:key="key")
            .taommw
              image(class="taomme", :src="item.avatarUrl", mode="widthFix")
              .taomma
                .taommr {{item.realName}}
              .taommt
                .taomms {{item.city}}
            .taommi
              .taommy(v-for="(itemmm,index2) in item.imgList",:key="index2")
                image(class="taommu", :src="itemmm", mode="widthFix",style="width: 100%")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import wxp from 'minapp-api-promise'

export default {
  components: {
    
  },
  computed: {
    ...mapState([
      'taomms',
      'taommlists'
    ]),
    TaommNav() {
    	return this.taomms
    },
    Taommlist() {
    	return this.taommlists
    },
    style() {
	    // 计算左侧剩余多少宽度，所以滚动条起始位置要加
	    let width = this.navWidth + 'px';
	    let left = this.navWidth * this.currentTab + 'px';
	    let style = {
	        left,
	        width,
	    }
	    return this.obj2style(style)
    },
    menuStyle() {
	    let style = {}
	    style['font-size'] = this.font + 'px'
	    style['width'] = this.navWidth + 'px'
	    return this.obj2style(style)
    },
    contentHeight() {
    	return this.winHeight - 62 + 'px'
    }
  },
  data () {
    return {
      winWidth: null,
	    winHeight: null,
	    navWidth: null,
	    menuWidth: 60,
	    font: 14,
	    currentTab: 0,
	    scrollleft: null,
	    init: {
	    	init: true,
	    	type: '欧美',
	    	num: 1
	    }
    }
  },
  mounted () {
    this.refreshTaommNav()
    this.refreshTaommList(this.init)
    this.init.num++
  },
  onPullDownRefresh () {
    this.refreshTaommList()
  },
  onReachBottom () {
    this.loadmore()
  },
  methods: {
    ...mapActions([
      'getTaommNav',
      'getTaommList'
    ]),
    async refreshTaommNav () {
      await this.getTaommNav()
      this.scrollleft = 300
      wx.stopPullDownRefresh()
    },
    async refreshTaommList (init) {
      await this.getTaommList(init)
      wx.stopPullDownRefresh()
    },
    loadmore () {
    	this.init.init = false
    	this.init.type = this.TaommNav[this.currentTab]
      this.getTaommList(this.init)
      this.init.num++
    },
    obj2style (style) {
    	let str = []
	    Object.keys(style).forEach(key => {
	        str.push(`${key}:${style[key]};`)
	    })
	    return str.join(';');
    },
    swichNav(e) {
	    const {
	        current
	    } = e.target.dataset;
	    if (this.currentTab === current) return false
	        // else this.currentTab = current;
	    else {
	        this.currentTab = current
	        this.init.init = true
			    this.init.type = this.TaommNav[this.currentTab]
			    this.init.num = 1
		      this.getTaommList(this.init)
		      this.init.num++
	    }
    },
    swiperChange(e) {
	    let {
	        current
	    } = e.target;
	    this.currentTab = current;
	    this.init.init = true
	    this.init.type = this.TaommNav[this.currentTab]
	    this.init.num = 1
      this.getTaommList(this.init)
      this.init.num++
    },
    scrollFn(e) {
      // console.log(e)
    },
    toLow(e) {
    	this.loadmore()
    }
  },
  async onLoad() {
    // 获取系统消息
    let info = await wxp.getSystemInfo();
    this.winWidth = info.windowWidth;
    this.winHeight = info.windowHeight
    if (!this.menuWidth) {
        // 如果没有
        this.navWidth = this.winWidth / this.TaommNav.length;
    } else {
        this.navWidth = this.menuWidth
    }
  },
}
</script>

<style lang="less">
.container-tao {
  font-size: 14px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  .swiper-box {
        display: block;
        width: 100%;
        overflow: hidden;
        .swiper-item {
            height: 100%;
            text-align: center;
        }
    }
}
.swiper-tab {
    width: 100%;
    text-align: center;
    line-height: 42px;
    white-space: nowrap;
    position: relative;
    .swiper-tab-item {
        transition: all .2s;
        font-size: 18px;
        height: 42px;
        display: inline-block;
        color: #777777;
    }
    .block {
        display: block;
        position: absolute;
        left: 0;
        height: 2px;
        background: red;
        bottom: 20px;
        transition: left .2s;
        z-index: 99;
    }
}
.content {
  height: 100%;
  .taommq{
  	padding: 10px;
  	.taommw{
  		display: flex;
  		align-items:center;
	  	.taomme{
	  		width: 30%;
	  		background:#fefefe;
				border:2px solid #fcfcfc;
				box-shadow:0px 2px 2px rgba(34, 25, 25, 0.4);
				margin:5px 2px 2px 2px;
				padding:1px;
				padding-bottom:5px;
				transition:opacity .4s ease-in-out;
				display:inline-block;
	  	}
	  	.taommr{
	  		font-size: 25px;
	  		margin: 10px;
	  	}
	  	.taomms{
	  		padding-top:5px;
	  		color:#c7254e;
	  	}
  	}
  	.taommi{
  		column-count:2;
			column-gap:2px;
			width:100%;
			.taommu{
				background:#fefefe;
				border:2px solid #fcfcfc;
				box-shadow:0px 2px 2px rgba(34, 25, 25, 0.4);
				margin:5px 2px 2px 2px;
				padding:1px;
				padding-bottom:5px;
				transition:opacity .4s ease-in-out;
				display:inline-block;
			}
  	}
  }
}
</style>
