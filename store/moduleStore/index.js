/*
** this part of the store will be used as the internet cache
 */

export const state = () => ({
  isLoading: false,
})


export const mutations = {
  startLoading(state){
    state.isLoading = true
  },
  doneLoading(state){
    state.isLoading = false;
  },
}

export const actions = {
}