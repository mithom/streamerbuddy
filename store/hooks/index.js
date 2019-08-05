import Vue from 'vue'

export const state = () => ({
  hooks: {}
})


export const mutations = {
  registerHook(state, data){
    Vue.set(state.hooks[data.module], data.hook, null)
  },
  registerModule(state, module){
    Vue.set(state.hooks, module, {})
  },
  updateData(state, data){
    state.hooks[data.module][data.hook] = data.newData
  }
}

export const actions = {
  registerHook ({state, commit}, data) {
    if(!state.hooks[data.module]){
      commit('registerModule', data.module)
    }
    commit('registerHook', data)
  }
}
