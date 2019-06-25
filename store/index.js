/*
** configure all store plugins
 */
import nativeRequire from "../app/native-require"
import Vue from 'vue'

const moduleLoader = require('../app/module-loader-plugin')
import vuexPersist from '~/plugins/vuex-persist'

function createVueComponents(module){
  Vue.component(module.main.name, function(resolve){resolve(nativeRequire(module.main.path))})
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
  activeScreen: 'Dashboard',
  activeModule: null,
  stateLoaded: false
})


export const mutations = {
  RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  addModule(state, module) {
    if(!state.appModules[module.category]){
      state.appModules[module.category] = [];
    }
    state.appModules[module.category].push(module)
  },
  removeModule(state, module){
    state.appModules[module.category] = state.appModules[module.category].filter((mod)=>mod.main.name !== module.main.name)
  },
  activateScreen(state, screen) {
    state.activeScreen = screen
  },
  activateModule(state, module) {
    state.activeModule = module
  },
  finishStateLoading(state){
    state.stateLoaded = true
  }
}
const storeModule = {category: 'CORE', main: {name:'StoreTutorial', path: ''}}

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
    if (state.activeModule === module.main.name){
      dispatch('activateFirstModule')
    }
  },
  addAllModules({commit, state, dispatch}, categories){
    let foundActiveModule= false

    for(const modules of Object.values(categories)){
      for(const data of Object.values(modules)){
        foundActiveModule |= data.main.name === state.activeModule
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
      commit('activateModule', state.appModules[Object.keys(state.appModules)[0]][0].main.name)
    }
  },
  async nuxtServerInit(storeContext, nuxtContext){

  }
}