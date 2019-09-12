import Vue from 'vue'
import {verify, decode} from 'jsonwebtoken'

export const state = () => ({
  nonce:{},
  access_tokens:{},
  lastAccountId: 0,
})

export const mutations = {
  setConnectionAttempt(state, data){
    state.nonce = data
  },
  setAccessToken(state, data){
    if(isValidAccessToken(state, data)){
      processToken(data)
      Vue.set(state.access_tokens, data.provider, {})
      Vue.set(state.access_tokens[data.provider], accountIdGen.next(state).value, data.access_token)
    }
  },
  addAccessToken(state, data){
    if(isValidAccessToken(state, data)){
      processToken(data)
      if(!state.access_tokens[data.provider]){
        Vue.set(state.access_tokens, data.provider, {})
      }
      Vue.set(state.access_tokens[data.provider], accountIdGen.next(state).value, data.access_token)
    }
  },
  removeAccessToken(state, data){
    Vue.delete(state.access_tokens[data.provider], data.connectionId)
  },
}

function* accountIdGenerator(){
  let state = yield null
  while(true){
    state.lastAccountId += 1
    state = yield state.lastAccountId
  }
}

const accountIdGen = accountIdGenerator()
accountIdGen.next()

function isValidAccessToken(state, data){
  return state.nonce.options.clientId === data.provider &&
    state.nonce.options.state === data.access_token.state
}

function processToken(data){
  if(data.access_token.hasOwnProperty('id_token')){
    data.access_token.id_token = decode(data.access_token.id_token)
  }
}