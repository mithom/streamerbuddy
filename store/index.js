/*
** configure all store plugins
 */
export const plugins = []

export const state = () => ({
  progress: 0
})


export const mutations = {
  updateProgress(state, newProgress){
    if (newProgress > state.progress){
      state.progress = newProgress
    }
  }
}

export const actions = {
  async nuxtServerInit(storeContext, nuxtContext){

  }
}