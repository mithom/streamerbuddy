/*
** configure all store plugins
 */
const moduleLoader = require('../app/module-loader-plugin')
import vuexPersist from '~/plugins/vuex-persist'

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
  addModule(state, module) {
    if(!state.appModules[module.category]){
      state.appModules[module.category] = [];
    }
    state.appModules[module.category].push(module)
    state.promoteStore = false
  },
  activateScreen(state, screen) {
    state.activeScreen = screen
  },
  activateModule(state, module) {
    state.activeModule = module
  },
  RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  finishStateLoading(state){
    state.stateLoaded = true
  }
}

export const actions = {
  activateScreen({commit, state}, screen){
    if (screen === 'Modules' && state.activeModule === null){
      if(Object.keys(state.appModules).length === 0){
        commit('activateModule', null)
      }else{
        commit('activateModule', state.appModules[Object.keys(state.appModules)[0]][0])
      }
    }
    commit('activateScreen', screen)
  },
  activateModule({commit}, module){
    commit('activateModule', module)
    commit('activateScreen', 'Modules')
  },
  async nuxtServerInit(storeContext, nuxtContext){

  }
}