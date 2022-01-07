import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: "",
    userName: "",
    password: "",
    userKind: ""
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUserName (state, userName) {
      state.userName = userName
    },
    setPassword (state, password) {
      state.password = password
    },
    setUserKind (state, userKind) {
      state.userKind = userKind
    }
  }
})
export default store