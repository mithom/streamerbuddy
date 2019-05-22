/*
** configure all store plugins
 */
const {createModuleLoaderPlugin} = require('../app/module-loader-plugin')
export const plugins = [createModuleLoaderPlugin()]

export const state = () => ({

})


export const mutations = {

}

export const actions = {
  async nuxtServerInit(storeContext, nuxtContext){

  }
}