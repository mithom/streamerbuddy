import Vue from 'vue'

export const state = () => ({
  moduleSettings: {}
})


export const mutations = {
  addModuleSetting(state, obj){
    if(!(obj.moduleName in state.moduleSettings)){
      Vue.set(state.moduleSettings, obj.moduleName,{})
    }
    if(!(obj.name in state.moduleSettings[obj.moduleName])){
      Vue.set(state.moduleSettings[obj.moduleName], obj.name, obj.default)
    }
  },
  setModuleSetting(state, obj){
    state.moduleSettings[obj.moduleName][obj.name] = obj.value;
  },
  removeModule(state, moduleName){
    Vue.delete(state.moduleSettings, moduleName)
  }
}

export const actions = {
  addModuleSettings ({commit}, obj){ //currently unused due to refactors
    for(const [name, setting] of Object.entries(obj.settings)){
      setting.moduleName = obj.moduleName
      setting.name = name
      commit('addModuleSetting', setting)
    }
  },
  removeModuleSettings({rootState, state, commit}, moduleInfo){
    // for (const comp of rootState.appModules[moduleInfo.category][moduleInfo.module].components){
    //   commit('removeComponent', comp.fullname)
    // }
    // commit('removeComponent', rootState.appModules[moduleInfo.category][moduleInfo.module].main.fullname)
    commit('removeModule', moduleInfo.module)
  }
}

export const getters = {
  settings: (state) => (moduleName) =>{
    return state.moduleSettings[moduleName]
  }
}
