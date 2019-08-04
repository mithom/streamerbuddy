import Vue from 'vue'

export const state = () => ({
  hooks: {}
})


export const mutations = {
  registerHook(state, name){
    Vue.set(state.hooks, name, null)
  },
  updateData(state, data){
    state[data.hook] = data.newData
  }
}

export const actions = {

}
