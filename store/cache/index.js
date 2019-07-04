/*
** this part of the store will be used as the internet cache
 */

export const state = () => ({
  Etags: {},
  cacheFiles: {},
})


export const mutations = {
  saveEtag(state, data){
    state.Etags[data.uri] = data.etag
  },
  updateCacheFile(state, data){
    state.cacheFiles[data.etag] = data.filePath
  },
}

export const actions = {
  addRequest({commit, state}, data){
    commit('saveEtag', {uri: data.uri, etag: data.etag})
    commit('updateCacheFile', {etag: data.etag, filePath: data.filePath})
  },
}