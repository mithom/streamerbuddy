/*
** this part of the store will be used as the internet cache
 */

export const state = () => ({
  Etags: {},
})


export const mutations = {
  saveEtag(state, data){
    state.Etags[data.uri] = data.etag
  },
}