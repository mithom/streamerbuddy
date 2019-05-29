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
  },
  addTemplate(state, {mod_index, comp_index, template}){
    state.appModules[mod_index].components[comp_index]["template"] = template
  }
}

export const actions = {
  async nuxtServerInit(storeContext, nuxtContext){

  }
}