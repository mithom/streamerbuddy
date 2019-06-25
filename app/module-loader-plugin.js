import {ipcRenderer} from 'electron'

//////////////////////////////////////
// Nuxt side loading of the modules
//////////////////////////////////////
export function plugin() {
  return async function(store){
    ipcRenderer.send('loadModules')
    ipcRenderer.on('modulesLoaded',(event, message)=>{
      store.dispatch('addAllModules', message)
      console.log('all modules have been loaded ')


      const unsub = store.subscribe((mutation, state)=>{
        if(mutation.type === 'RESTORE_MUTATION'){
          const modules = Object.values(state.appModules).map(cat=>Object.values(cat).map(mod=>mod.main.name))
          if (!modules.includes(state.activeModule)){
            store.dispatch('activateFirstModule')
          }
        }
      })
    })
  }
}