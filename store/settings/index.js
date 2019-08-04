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
  }
}

export const actions = {
  addComponentSettings ({commit}, obj){ //currently unused due to refactors
    for(const [name, setting] of Object.entries(obj.settings)){
      setting.component = obj.component
      setting.name = name
      commit('addComponentSetting', setting)
    }
  }
}

export const getters = {
  settings: (state) => (component) =>{
    return state.componentSettings[component]
  }
}
