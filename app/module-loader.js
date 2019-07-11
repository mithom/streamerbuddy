const {ipcMain} = require('electron')
const fs = require('fs').promises
const {categories} = require('./enums')
const path = require('path')
const camelize = require('camelize')
const {modules_path, module_info} = require('./constants')

//////////////////////////////////////
// Electron side loading of the plugin
//////////////////////////////////////

const modules={}
let loadingPromise = null

async function load_modules(){
  //first load the core modules
  await load_cat_module(categories.CORE)
  //load all other modules in parallel
  await Promise.all(Object.keys(categories).map(async (cat)=>{
    if(cat !== categories.CORE) {
      await load_cat_module(cat)
    }
  }))
}

async function load_cat_module(cat){
  let cat_path = path.join(modules_path, cat)
  modules[cat] = {}
  try{
    let options = {withFileTypes: true}
    let files = await fs.readdir(cat_path, options)
    await Promise.all(files.map(async (item)=>{
      if(item.isDirectory()){
        await load_module(path.join(cat_path, item.name), cat, item.name)
      }
    }))
  }catch (e) {
    await fs.mkdir(cat_path,{recursive: true})
  }
}

async function load_module(path_, cat, module){
  let moduleinfo_path = path.join(path_, module_info)
  try{
    let info = await fs.stat(moduleinfo_path)
    if(info.isFile()){
      let data = JSON.parse((await fs.readFile(moduleinfo_path)).toString())
      if(verifyModuleData(data)){
        processData(data, path_, cat)
        modules[cat][module] = data
      }else{
        console.log('failed to load '+module+'\'s module data.')
      }
    }
  }catch (e) {
    console.log('module info does not exists or not valid json')
  }
}

function processData(data, path_, cat){
  data.category = cat
  data.main = {
    path: path.join(path_, `${camelize(data.main)}.common.js`),
    name: camelize(data.main)
  }
  if(typeof data.components === 'undefined' || data.components === null) {
    data.components = []
  }
  for(const component of data.components){
    component.name = camelize(component.name)
    component.fullname = camelize(`${data.main.name}-${component.name}`)
    component.path = path.join(path_, `${component.name}.common.js`)
  }
}

function verifyModuleData(data){
  //TODO: implement
  return true
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
