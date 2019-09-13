const {ipcMain, dialog} = require('electron')
const fs = require('fs').promises
const { modules_path } = require('./constants')
const path = require('path')
const atob = require('atob')
const sha1 = require('js-sha1')
const {reloadModules} = require('./module-loader')
const {octokit} = require('./myOctoKit')

ipcMain.on('install-module', async (event, data)=>{
  const module_path = path.join(modules_path, data.category, data.module)
  try{
    await fs.mkdir(module_path,{recursive: true})
    await Promise.all(data.components.map(component => installModule(component, module_path)))
    console.log('done installing, now reloading')
    await reloadModules(event)
  }catch (e) {
    console.log(e)
    throw e
  }
})

async function installModule(component, module_path){
  const filepath = component.path.split('/')
  const { data } = await octokit.request(component.url)
  if(data.encoding === 'base64'){
    data.content = atob(data.content)
  }
  if(component.sha === sha1(`blob ${component.size}\0${data.content}`)){
    await fs.writeFile(path.join(module_path, filepath[filepath.length - 1]), data.content)
  }else{
    const options = {
      type:"question",
      buttons: ['Install anyway', 'Cancel'],
      title: 'sha-1 check failed',
      defaultId: 0,
      message: 'sha-1 validation check failed, do you still want to install this file?',
      detail: 'This means the file might not be the one you expected to.\r\n' + component.path
    }
    const response = await dialog.showMessageBox(null, options)
    if(response === 0){
      await fs.writeFile(path.join(module_path, filepath[filepath.length - 1]), data.content)
    }
  }
}

ipcMain.on('uninstall-module', async (event, data)=>{
  console.log('uninstalling module')
  const modDir = path.join(modules_path, data.category, data.module)
  await deleteFolderRecursive(modDir)
})

async function deleteFolderRecursive (folder) {
  const files = await fs.readdir(folder, {withFileTypes: true})
  await Promise.all(files.map(async (file)=>{
    console.log(file.name)
    if(file.isDirectory()){
      await deleteFolderRecursive(path.join(folder,file.name))
    }else{
      await fs.unlink(path.join(folder, file.name))
    }
  }))
  await fs.rmdir(folder)
}
