const {octokit, owner, repo} = require('~/app/myOctoKit')
const merge = require('lodash.merge')
const storage = require('electron').remote.require('electron-json-storage') //filesystem access only on remote thread
import {promisify} from 'util';

const get = promisify(storage.get)
const set = promisify(storage.set)
const remove = promisify(storage.remove)


let registered = false;

//custom cache implementation
function registerHooks(state, commit){
  if(!registered){
    octokit.hook.before('request', async (options)=>{
      if(state.cache.Etags[options.url]){
        return merge(options, {headers:{'If-None-Match': state.cache.Etags[options.url]}})
      }
    })

    octokit.hook.error('request', async (error, options)=>{
      if(error.status === 304){
        error.data = await get(error.headers.etag)
      }
      return error
    })

    octokit.hook.after('request', async (result, options)=>{
      if(result.status ===200 && result.headers.etag){
        if(result.url in state.cache.Etags){
          remove(state.cache.Etags[options.uri])
        }
        set(result.headers.etag, result.data)
        commit('cache/saveEtag', {uri: result.url, etag: result.headers.etag}, {root: true})
      }
    })

    registered = true
  }
}

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
