
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name:sessionStorage.getItem('login_name'),
    userId:sessionStorage.getItem('userId')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, id) => {
      state.userId = id
    }
  },

  actions: {
    
  }
}

export default user
