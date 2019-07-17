/*
** configure all store plugins
 */
import nativeRequire from "../app/native-require"
import Vue from 'vue'

const moduleLoader = require('../app/module-loader-plugin')
import vuexPersist from '~/plugins/vuex-persist'

function createVueComponents(module){
  console.log(module.main.fullname)
  Vue.component(module.main.fullname, function(resolve){resolve(nativeRequire(module.main.path))})
  module.components.forEach((comp)=>{
    // async load the modules so we only load the visible components and not the unused ones
    Vue.component(comp.fullname, function(resolve){resolve(nativeRequire(comp.path))})
  })
}

export const plugins = [
  moduleLoader.plugin(),
  vuexPersist.plugin
]

export const state = () => ({
  appModules: {},
  moduleState: {},
  activeScreen: 'Dashboard',
  activeModule: null,
  stateLoaded: false,
  notifications:['i am a notification','i am a second notif'],
  alerts:['there is only 1 alert for now'],
})

export const mutations = {
  RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  addModule(state, module) {
    if(!state.appModules[module.category]){
      Vue.set(state.appModules,module.category,{});
    }
    Vue.set(state.appModules[module.category], module.main.fullname, module)

    Vue.set(state.moduleState, module.main.fullname, state.moduleState[module.main.fullname] || false)
  },
  removeModule(state, module){
    //state.appModules[module.category] = state.appModules[module.category].filter((mod)=>mod.main.name !== module.main.name)
    Vue.delete(state.appModules[module.category], module.main.name)
    Vue.delete(state.moduleState, module.main.name)
    //TODO: remove cat if cat is empty
  },
  activateScreen(state, screen) {
    state.activeScreen = screen
  },
  activateModule(state, module) {
    Vue.set(state, 'activeModule', module)
  },
  changeModuleState(state, data){
    Vue.set(state.moduleState, data.module, data.state)
  },
  finishStateLoading(state){
    state.stateLoaded = true
  },
  addNotification(state, notification){
    state.notifications.push(notification)
  },
  removeNotification(state, val){
    let idx;
    if(Number.isInteger(val)){
      idx = val
    }else{
      idx = state.notifications.find(val)
    }
    state.notifications.splice(idx,1)
  },
  addAlert(state, alert){
    state.alerts.push(alert)
  },
  removeAlert(state, val){
    let idx;
    if(Number.isInteger(val)){
      idx = val
    }else{
      idx = state.alerts.find(val)
    }
    state.alerts.splice(idx,1)
  }
}

export const actions = {
  activateScreen({commit, state, dispatch}, screen){
    if (screen === 'Modules' && state.activeModule === null){
      dispatch('activateFirstModule')
    }
    commit('activateScreen', screen)
  },
  activateModule({commit}, module){
    commit('activateModule', module)
    commit('activateScreen', 'Modules')
  },
  removeModule({commit, state, dispatch}, module){
    commit('removeModule', module)
    if (state.activeModule === module.main.fullname){
      dispatch('activateFirstModule')
    }
  },
  addAllModules({commit, state, dispatch}, categories){
    let foundActiveModule= false

    for(const modules of Object.values(categories)){
      for(const data of Object.values(modules)){
        foundActiveModule |= data.main.fullname === (state.activeModule && state.activeModule.fullname)
        createVueComponents(data)
        commit('addModule', data)
      }
    }
    if(!foundActiveModule){
      dispatch('activateFirstModule')
    }
  },
  activateFirstModule({state, commit}){
    if(Object.keys(state.appModules).length === 0){
      commit('activateModule', null)
    }else{
      const mod = Object.values(Object.values(state.appModules)[0])[0]
      commit('activateModule', {name: mod.main.name, fullname: mod.main.fullname})
    }
  },
  async nuxtServerInit(storeContext, nuxtContext){

  }
}