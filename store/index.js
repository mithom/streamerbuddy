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
    if(!state.appModules[module.category]){
      state.appModules[module.category] = [];
    }
    state.appModules[module.category].push(module)
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
      if(Object.keys(state.appModules).length === 0){
        commit('activateModule', 'PROMOTE-STORE')
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