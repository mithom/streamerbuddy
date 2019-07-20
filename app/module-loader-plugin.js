import {ipcRenderer} from 'electron'

//////////////////////////////////////
// Nuxt side loading of the modules
//////////////////////////////////////
export function plugin() {
  return async function(store){
    ipcRenderer.on('modulesLoaded',(event, message)=>{
      store.dispatch('addAllModules', {data:message, registerModule: store.registerModule})
      console.log('all modules have been loaded ')

      const unsub = store.subscribe((mutation, state)=>{
        if(mutation.type === 'RESTORE_MUTATION'){
          const modules = Object.values(state.appModules).map(cat=>Object.values(cat).map(mod=>mod.main.fullname)).flat()
          if (!modules.includes(state.activeModule && state.activeModule.fullname)){
            store.dispatch('activateFirstModule')
          }
        }
      })
    })
    ipcRenderer.send('loadModules')
  }
}
