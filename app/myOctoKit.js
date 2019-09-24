const throttling = require('@octokit/plugin-throttling')
const retry = require('@octokit/plugin-retry')
const Octokit = require('@octokit/rest')
const app = require('electron').app || require('electron').remote.app
const merge = require('lodash.merge')
const MyOctokit = Octokit.plugin([retry, throttling]) //retry requests up to 3 times for recoverable errors
const storage = require('electron-json-storage') //filesystem access only on remote thread
const {promisify} = require('util')

const get = promisify(storage.get)
const set = promisify(storage.set)
const remove = promisify(storage.remove)
const has = promisify(storage.has)

module.exports.owner = 'StreamerBuddy'
module.exports.repo = 'streamerbuddy-store'

const octokit = MyOctokit({
  userAgent:`streamerBuddy v${app.getVersion()}`,
  throttle: {
    onRateLimit:(retryAfter, options) => {
      if(options.request.retryCount === 0){
        return true
      }
    },
    onAbuseLimit: (retryAfter, options) =>{octokit.log.warn(`Abuse limit reached for request ${options.method} ${options.url}`)}
  }
})

module.exports.octokit = octokit

let registered = false;

//custom cache implementation
function registerHooks(state, commit){
  if(!registered){
    octokit.hook.before('request', async (options)=>{
      if(state.cache.Etags[options.url] && await has(state.cache.Etags[options.url])){
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
          await remove(state.cache.Etags[result.url])
        }
        await set(result.headers.etag, result.data)
        commit('cache/saveEtag', {uri: result.url, etag: result.headers.etag}, {root: true})
      }
    })

    registered = true
  }
}

module.exports.registerHooks = registerHooks