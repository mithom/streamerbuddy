/*
** configure all store plugins
 */
const moduleLoader = require('../app/module-loader-plugin')
export const plugins = [moduleLoader.plugin()]

export const state = () => ({
  appModules: [],
  activeScreen: 'Dashboard',
  activeModule: null,
})


export const mutations = {
  addModule(state, module) {
    state.appModules.push(module)
  },
  activateScreen(state, screen) {
    state.activeScreen = screen
  },
  activateModule(state, module) {
    state.activeModule = module
  }
}

export const actions = {
  activateScreen({commit, state}, screen){
    if (screen === 'Modules' && state.activeModule === null){
      if(state.appModules.length === 0){
        commit('activateModule', 'PROMOTE-STORE')
      }else{
        commit('activateModule', state.appModules[0]['main']['name'])
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