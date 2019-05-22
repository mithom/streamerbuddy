const {app, ipcMain} = require('electron')
const fs = require('fs').promises
const Enum = require('enum')
const path =require('path')

//////////////////////////////////////
// Electron side loading of the plugin
//////////////////////////////////////

const modules_path = path.join(app.getPath('userData'), 'app','modules', 'modules/')
const categories = new Enum(['CORE', 'GAMING', 'UTILITY'])
const module_info = 'module.json'

const modules={}
var loadingPromise = null

async function load_modules(){
  //first load the core modules
  await load_cat_module(categories.CORE)
  console.log('done loading CORE')
  //load all other modules in parallel
  await Promise.all(categories.enums.map(async (cat)=>{
    if(cat !== categories.CORE) {
      await load_cat_module(cat)
      console.log('done loading: '+cat.key)
    }
  }))
}

async function load_cat_module(cat){
  let cat_path = path.join(modules_path, cat.key)
  try{
    let options = {withFileTypes: true}
    let files = await fs.readdir(cat_path, options)
    await Promise.all(files.map(async (item)=>{
      if(item.isDirectory()){
        console.log(item.name)
        await load_module(path.join(cat_path, item.name), cat)
        console.log('done: ' + item.name)
      }
    }))
  }catch (e) {
    await fs.mkdir(cat_path,{recursive: true})
  }
}

async function load_module(path, cat){
  let moduleinfo_path = path.join(path, module_info)
  try{
    let info = await fs.stat(moduleinfo_path)
    if(info.isFile()){
      let data = JSON.parse((await fs.readFile(moduleinfo_path)).toString())
      console.log(data)
      
      //TODO: effectively load modules
    }
  }catch (e) {
    console.log('module info does not exists or not valid json')
  }
}

module.exports.createModuleLoaderHook = function () {
  // start working on the module loading - but don't send the data until the vuex modulesLoader plugin is ready
  // (it'll send a signal)
  loadingPromise = new Promise(async (resolve, reject)=>{
    try{
      await load_modules()
      resolve()
    }catch (e) {
      reject(e)
    }
  })

  ipcMain.on('loadModules', async (event)=>{
    await loadingPromise
    event.sender.send('modulesLoaded', modules)
  })
}