import axios from 'axios'

const SBAxios = axios.create({
  baseURL: 'https://streamerbuddy.ddns.net/api/v1/'
})

export const state = () => ({
  auth_token: null,
  id: null,
  username: null,
  email: null,
  roles: [],
  reg_error: null
})


export const mutations = {
  logIn(state, userData){
    state.auth_token = userData.auth_token
    state.id = userData.id
    state.username = userData.username
    state.email = userData.email
    state.roles = userData.roles.map(role => role.role)
  },
  logOut(state){
    state.auth_token = null
    state.id = null
    state.username = null
    state.email = null
    state.roles = []
  },
  clearError(state){
    state.reg_error = null
  },
  setError(state, data){
    state.reg_error = data
  }
}

export const actions = {
  async logIn({commit}, {username, password}){
    const {status, data} = await SBAxios.get('/token', {auth:{username, password}})
    if(status === 200){
      const {status, data: userData} = await SBAxios.get(data['Location'].replace(/^\/api\/v1/, ''), {headers: {'Authorization': `Bearer ${data['token']}`}})
      if(status === 200){
        commit('logIn', {auth_token: data['token'], ...userData})
      }
    }
  },
  async register({dispatch, commit}, registerData){
    commit('clearError')
    try{
      const {status} = await SBAxios.post('/users/', registerData)
      if(status === 201){
        await dispatch('logIn', registerData)
      }
    }catch (error) {
      commit('setError', error.data)
    }
  }
}

export const getters = {
  isAdmin(state){
    return state.roles.includes('role.ADMIN')
  },
  authHeaders(state){
    return {'Authorization': `Bearer ${state.auth_token}`}
  },
  async loggedIn(state, getters){
    if(state.auth_token === null){
      return false
    }else{
      console.log(state.auth_token)
      const {status} = await SBAxios(`/users/${state.id}`, {headers:{...getters.authHeaders}})
      return status === 200
    }
  }
}
