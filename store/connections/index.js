import Vue from 'vue'

export const state = () => ({
  nonce:{},
  access_tokens:{}
})


export const mutations = {
  addConnectionAttempt(state, data){
    Vue.set(state.nonce, data.nonce, data.options)
  },
  addAccessToken(state, data){
    if(!state.access_token[data.provider]){
      Vue.set(state.access_token, data.provider, {})
    }
    Vue.set(state.access_token[data.provider], data.user_id, data.user)
  },
}
