const {ipcMain, app} = require('electron')
const fs = require('fs').promises
const { modules_path } = require('./constants')
const path = require('path')
const atob = require('atob')
const throttling = require('@octokit/plugin-throttling')
const retry = require('@octokit/plugin-retry')
const Octokit = require('@octokit/rest')
const sha1 = require('js-sha1')

const MyOctokit = Octokit.plugin([retry, throttling]) //retry requests up to 3 times for recoverable errors
const owner = 'StreamerBuddy'
const repo = 'streamerbuddy-store'

const octokit = MyOctokit({
  userAgent:`streamerBuddy v${app.getVersion()}`,
  throttle: {
    onRateLimit:(retryAfter, options) => {
      if(options.requests.retryCount === 0){
        return true
      }
    },
    onAbuseLimit: (retryAfter, options) =>{octokit.log.warn(`Abuse limit reached for request ${options.method} ${options.url}`)}
  }
})

ipcMain.on('install-module', async (event, data)=>{
  const module_path = path.join(modules_path, data.category, data.module)
  try{
    await fs.mkdir(module_path,{recursive: true})
    console.log(data.components)
    await Promise.all(data.components.map(async component => {
      const filepath = component.path.split('/')
      const { data } = await octokit.request(component.url)
      if(data.encoding === 'base64'){
        data.content = atob(data.content)
      }
      //TODO: verify sha hash
      if(component.sha === sha1(`blob ${component.size}\0${data.content}`)){
        await fs.writeFile(path.join(module_path, filepath[filepath.length - 1]), data.content)
      }else{
        console.warn('sha did not match with downloaded component - did not install out of safety')
      }
    }))
    console.log('done installing')
  }catch (e) {
    console.log(e)
    throw e
  }

})
