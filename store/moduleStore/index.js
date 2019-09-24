const {remote} = require('electron')
const {octokit, owner, repo, registerHooks} = remote.require('./app/myOctoKit')

async function getAvailableModuleFolders(state, commit){
  //TODO: ref -> master vs beta branch for beta testers
  //TODO: pagination

  registerHooks(state, commit)

  const { data: repoData, status } = await octokit.repos.getContents({
    owner,
    repo,
    path: ''
  })
  if([200,304].includes(status)){
    const tree_sha = repoData
      .filter((data)=>data.name === "dist")
      .map((data)=>data.sha)[0]

    const {data: treeData} = await octokit.git.getTree({
      owner,
      repo,
      tree_sha,
      recursive: 1
    })
    treeData.success = true
    return treeData
  }else{
    return {success: false}
  }
}

/*
** this part of the store will be used as the internet cache
 */

export const state = () => ({
  isLoading: false,
  gitTree: {}
})


export const mutations = {
  startLoading(state){
    state.isLoading = true
  },
  doneLoading(state){
    state.isLoading = false;
  },
  addCategory(state, cat){
    state.gitTree[cat] = {}
  },
  addModule(state, data){
    state.gitTree[data.cat][data.module] = []
  },
  addFile(state, fileData){
    state.gitTree[fileData.cat][fileData.module].push(fileData.path)
  },
  clearStore(state){
    state.gitTree = {}
  }
}

export const actions = {
  async getModuleStoreData({ commit, rootState}){
    commit('startLoading')
    const data = await getAvailableModuleFolders(rootState, commit)
    if(data.success){
      for(const branch of data.tree){
        const path = branch.path.split('/')
        switch(path.length){
        case 1:
          commit('addCategory', path[0])
          break
        case 2:
          commit('addModule', {cat: path[0], module: path[1]})
          break
        case 3:
          if(path[2].endsWith('.json')){
            commit('addFile',{cat: path[0], module: path[1], path: branch})
          }
          break
        case 4:
          if(path[3].endsWith('.umd.min.js') || path[3].endsWith('.umd.js') || path[3].endsWith('.common.js')){
            commit('addFile',{cat: path[0], module: path[1], path: branch})
          }
          break
        default:
          break
        }
      }
    }else{
      //TODO: try again later
    }
    commit('doneLoading')
  }
}
