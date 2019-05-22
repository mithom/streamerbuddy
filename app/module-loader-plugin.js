const {ipcRenderer} = require('electron')

//////////////////////////////////////
// Nuxt side loading of the modules
//////////////////////////////////////
module.exports.createModuleLoaderPlugin = function(){
  return function(store){
    ipcRenderer.send('loadModules')
    ipcRenderer.on('modulesLoaded',(event, message)=>{
      console.log('all modules have been loaded ')
      // store.commit('addModules', message)
    })
  }
}