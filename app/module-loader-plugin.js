const {ipcRenderer} = require('electron')
const Vue = require('vue')

//////////////////////////////////////
// Nuxt side loading of the modules
//////////////////////////////////////
export function plugin() {
  return function(store){
    ipcRenderer.send('loadModules')
    ipcRenderer.on('modulesLoaded',(event, message)=>{
      console.log(message)
      for(const [category, modules] of Object.entries(message)){
        for(const [modulei, data] of Object.entries(modules)){
          let module_name = `${category}-${modulei}`
          //Vue.component(module_name, data.main)
          store.commit('addModule', module_name)
        }
      }

      console.log('all modules have been loaded ')
      // store.commit('addModules', message)
    })
  }
}