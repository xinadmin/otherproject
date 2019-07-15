import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'

/* vuex 数据持久化 */
import persistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView
  },
  getters,
  plugins: [persistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
          // 只储存state中的assessmentData
          // tagsView: val.tagsVie
        }
    }
  })]
})

export default store
