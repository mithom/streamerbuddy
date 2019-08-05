import Vue from 'vue'

export const state = () => ({
  hooks: {},
  sinks: {},
})


export const mutations = {
  registerHook(state, data){
    Vue.set(state.hooks[data.module], data.hook, null)
  },
  registerModuleHook(state, module){
    Vue.set(state.hooks, module, {})
  },
  updateHookData(state, data){
    state.hooks[data.module][data.hook] = data.newData
  },
  registerSink(state, data){
    Vue.set(state.sinks[data.module], data.sink, [])
  },
  registerModuleSink(state, module){
    Vue.set(state.sinks, module, {})
  },
  updateSinkData(state, data){
    state.sinks[data.module]?.[data.sink]?.push?.(data.newData)
  },
  clearSinkData(state, data){
    state.sinks[data.module][data.sink] = []
  }
}

export const actions = {
  registerHook ({state, commit}, data) {
    if(!state.hooks[data.module]){
      commit('registerModuleHook', data.module)
    }
    commit('registerHook', data)
  },
  registerSink({state, commit}, data){
    if(!state.sinks[data.module]){
      commit('registerModuleSink', data.module)
    }
    commit('registerSink', data)
  }
}
