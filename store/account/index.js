import axios from 'axios'

const SBAxios = axios.create({
  baseURL: 'https://streamerbuddy.ddns.net/api/v1/'
})

export const state = () => ({
  auth_token: null,
  id: null,
  username: null,
  email: null,
  roles: []
})


export const mutations = {
  logIn(state, userData){
    console.log(userData)
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
  }
}

export const actions = {
  async logIn({commit}, authData){
    const {status, data} = await SBAxios.get('/token', {auth:authData})
    if(status === 200){
      const {status, data: userData} = await SBAxios.get(data['Location'].replace(/^\/api\/v1/, ''), {headers: {'Authorization': `Bearer ${data['token']}`}})
      if(status === 200){
        commit('logIn', {auth_token: data['token'], ...userData})
      }
    }
  }
}

export const getters = {
  isAdmin(state){
    return state.roles.includes('role.ADMIN')
  },
  authHeaders(state){
    return {'Authorization': `Bearer ${state.auth_token}`}
  }
}
