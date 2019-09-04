import Vue from 'vue'

export const state = () => ({
  componentGrid:[],
  managing: false,
  nextComponentId: 1,
})

export const mutations = {
  updateList(state, data){
    Vue.set(state, 'componentGrid', data)
  },
  consumeComponentId(state){
    state.nextComponentId += 1
  },
  startAdmin(state){
    state.managing = true
  },
  stopAdmin(state){
    state.managing = false
  },
}