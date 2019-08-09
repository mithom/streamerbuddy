import Vue from 'vue'

export const state = () => ({
  nonce:{},
  access_tokens:{},
  nextAccountId: 0,
})

export const mutations = {
  setConnectionAttempt(state, data){
    state.nonce = data
  },
  setAccessToken(state, data){
    if(isValidAccessToken(state, data)){
      Vue.set(state.access_tokens, data.provider, {})
      Vue.set(state.access_tokens[data.provider], data.id, data.access_token)
    }
  },
  addAccessToken(state, data){
    if(isValidAccessToken(state, data)){
      if(!state.access_tokens[data.provider]){
        Vue.set(state.access_tokens, data.provider, {})
      }
      Vue.set(state.access_tokens[data.provider], data.id, data.access_token)
    }
  },
  consumeAccountId(state, data){
    state.nextAccountId += 1
  }
}

function isValidAccessToken(state, data){
  return state.nonce.options.clientId === data.provider &&
    state.nonce.options.state === data.access_token.state
}