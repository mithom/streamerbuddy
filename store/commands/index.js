import Vue from 'vue'

export const state = () => ({
  modules: {},
})

export const mutations = {
  addCommand(state, data){
    Vue.set(state.modules, data.module, data.command)
  },
  removeCommand(state, data){
    Vue.delete(state.modules[data.module], data.command)
  }
}

export const actions = {
}
