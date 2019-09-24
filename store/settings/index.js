import Vue from 'vue'

export const state = () => ({
  componentSettings: {}
})


export const mutations = {
  addComponentSetting(state, obj){
    if(!(obj.component in state.componentSettings)){
      Vue.set(state.componentSettings, obj.component,{})
    }
    if(!(obj.name in state.componentSettings[obj.component])){
      Vue.set(state.componentSettings[obj.component], obj.name, obj.default)
    }
  },
  setComponentSetting(state, obj){
    state.componentSettings[obj.component][obj.name] = obj.value;
  },
  removeComponent(state, component){
    Vue.delete(state.componentSettings, component)
  }
}

export const actions = {
  addComponentSettings ({commit}, obj){ //currently unused due to refactors
    for(const [name, setting] of Object.entries(obj.settings)){
      setting.component = obj.component
      setting.name = name
      commit('addComponentSetting', setting)
    }
  },
  removeModuleSettings({rootState, state, commit}, moduleInfo){
    for (const comp of rootState.appModules[moduleInfo.category][moduleInfo.module].components){
      commit('removeComponent', comp.fullname)
    }
    commit('removeComponent', rootState.appModules[moduleInfo.category][moduleInfo.module].main.fullname)
  }
}

export const getters = {
  settings: (state) => (component) =>{
    return state.componentSettings[component]
  }
}
