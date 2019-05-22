/*
** configure all store plugins
 */
const moduleLoader = require('../app/module-loader-plugin')
export const plugins = [moduleLoader.plugin()]

export const state = () => ({
  appModules: [],
  active_module: ''
})


export const mutations = {
  addModule(state, module) {
    state.appModules.push(module)
  }
}

export const actions = {
  async nuxtServerInit(storeContext, nuxtContext){

  }
}