const {ipcRenderer} = require('electron')
//////////////////////////////////////
// Nuxt side loading of the modules
//////////////////////////////////////
export function plugin() {
  return function(store){
    ipcRenderer.send('loadModules')
    ipcRenderer.on('modulesLoaded',(event, message)=>{
      //TODO: extract to a store action -> reuse for installing
      for(const [category, modules] of Object.entries(message)){
        for(const [module, data] of Object.entries(modules)){
          data.components.forEach((component)=>{
          })
          store.commit('addModule', data)
        }
      }
      console.log('all modules have been loaded ')
    })
  }
}