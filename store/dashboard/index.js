import Vue from 'vue'

export const state = () => ({
  componentGrid:[],
  nextComponentId: 1
})

export const mutations = {
  updateList(state, data){
    Vue.set(state, 'componentGrid', data)
  },
  consumeComponentId(state){
    state.nextComponentId += 1
  }
}