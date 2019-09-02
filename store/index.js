/*
** configure all store plugins
 */
import nativeRequire from "../app/native-require"
import Vue from 'vue'

const moduleLoader = require('../app/module-loader-plugin')
import vuexPersist from '~/plugins/vuex-persist'

function createVueComponents(module){
  Vue.component(module.main.fullname, function(resolve){resolve(nativeRequire(module.main.path))})
  module.components.forEach((comp)=>{
    // async load the modules so we only load the visible components and not the unused ones
    Vue.component(comp.fullname, function(resolve){resolve(nativeRequire(comp.path))})
  })
}

function removeVueComponents(moduleInfo, state){
  for (const comp of state.appModules[moduleInfo.category][moduleInfo.module].components){
    delete Vue.options.components[comp.fullname]
  }
  delete Vue.options.components[state.appModules[moduleInfo.category][moduleInfo.module].main.fullname]
}

function registerStoreModule(registerModule, module, state){
  if(module.storePath){
    if(!state.modules){
      registerModule('modules',{})
    }
    if(state.modules && state.modules[module.name]){
      registerModule(['modules', module.name], nativeRequire(module.storePath), {preserveState: true})
    }else{
      registerModule(['modules', module.name], nativeRequire(module.storePath))
    }
  }
}

function unregisterStoreModule(unregisterModule, moduleInfo, state){
  if(state.modules && state.modules[moduleInfo.module]){
    unregisterModule(['modules', moduleInfo.module])
  }
}

export const plugins = [
  moduleLoader.plugin(),
  vuexPersist.plugin
]

export const state = () => ({
  appModules: {},
  moduleState: {},
  screens: ['Dashboard', 'Modules', 'Commands', 'Timers', 'Extras'],
  activeScreen: 'Dashboard',
  activeModule: null,
  notifications:['i am a notification','i am a second notif'],
  alerts:['there is only 1 alert for now'],
})

export const mutations = {
  RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  addModule(state, module) {
    if(!state.appModules[module.category]){
      Vue.set(state.appModules,module.category,{});
    }
    Vue.set(state.appModules[module.category], module.name, module)

    Vue.set(state.moduleState, module.main.fullname, state.moduleState[module.name] || false)
  },
  removeModule(state, moduleInfo){
    //state.appModules[module.category] = state.appModules[module.category].filter((mod)=>mod.main.name !== module.main.name)
    Vue.delete(state.moduleState, moduleInfo.module)
    Vue.delete(state.appModules[moduleInfo.category], moduleInfo.module)
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
  },
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
  removeModule({commit, state, dispatch}, {data: moduleInfo, unregisterModule}){
    let wasActive = false
    if ((state.activeModule && state.activeModule.fullname) === state.appModules[moduleInfo.category][moduleInfo.module].main.fullname){
      wasActive = true
    }
    removeVueComponents(moduleInfo, state)
    unregisterStoreModule(unregisterModule, moduleInfo, state)
    commit('removeModule', moduleInfo)
    if(wasActive){
      dispatch('activateFirstModule')
    }
  },
  addAllModules({commit, state, dispatch}, {data: categories, registerModule}){
    let foundActiveModule= false
    for(const modules of Object.values(categories)){
      for(const data of Object.values(modules)){
        foundActiveModule |= data.main.fullname === (state.activeModule && state.activeModule.fullname)
        registerStoreModule(registerModule, data, state)
        createVueComponents(data)
        commit('addModule', data)
      }
    }
    if(!foundActiveModule){
      dispatch('activateFirstModule')
    }
  },
  activateFirstModule({commit, getters: {allModules}}){
    if(allModules.length === 0){
      commit('activateModule', null)
    }else{
      const mod = allModules[0]
      commit('activateModule', {name: mod.main.name, fullname: mod.main.fullname})
    }
  },
  async nuxtServerInit(storeContext, nuxtContext){

  }
}

export const getters = {
  allModules: state => Object.values(state.appModules).map(cat=>Object.values(cat)).flat(),
  activeModule: state => state.activeScreen === 'Modules' ? (state.activeModule || {name: "Tutorial", fullname: "StorePromote"}) : null
}
