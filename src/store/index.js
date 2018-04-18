import Vue from 'vue'
import Vuex from 'vuex'
import xml2json from 'xmlstring2json'
import { formatSlideList, formatNewsList, formatTopicList } from '@/utils'
import api from '@/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    petals: [],
    taomms: [],
    taommlists: []
  },
  mutations: {
    petals (state, data) {
      state.petals = data
    },
    taomms (state, data) {
      state.taomms = data
    },
    taommlists (state, data) {
      state.taommlists = data
    }
  },
  actions: {
    async getPetals ({ state, commit }, init) {
      let replytime = Date.now()
      const topics = await api.getPetals(replytime, state.num)
      state.num++
      if (!topics) return
      state.petals.push(JSON.parse(topics).showapi_res_body)
      if (init) {
        commit('petals', state.petals)
      } else {
        commit('petals', state.petals.concat(formatedTopics))
      }
    },
    async getTaommNav ({ state, commit }) {
    	let replytime = Date.now()
      const taomms = await api.getTaommNav(replytime)
      if (!taomms) return
      const formatedTaommNav = JSON.parse(taomms).showapi_res_body.allTypeList
      commit('taomms', formatedTaommNav)
    },
    async getTaommList ({ state, commit }, init) {
    	let replytime = Date.now()
    	wx.showLoading({
        title: '加载中',
      })
      const taommlists = await api.getTaommList(replytime, init.type, init.num)
      wx.hideLoading()
      if (!taommlists) return
      const formatedTaommList = JSON.parse(taommlists).showapi_res_body.pagebean.contentlist
      if (init.init) {
        commit('taommlists', formatedTaommList)
        console.log(formatedTaommList)
      } else {
        commit('taommlists', state.taommlists.concat(formatedTaommList))
      }
    }
  }
})

export default store
