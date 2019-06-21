import {ipcRenderer} from 'electron'
import nativeRequire from '../app/native-require'
import path from 'path'
import Vue from 'vue'

//////////////////////////////////////
// Nuxt side loading of the modules
//////////////////////////////////////
export function plugin() {
  return async function(store){
    ipcRenderer.send('loadModules')
    ipcRenderer.on('modulesLoaded',(event, message)=>{
      //TODO: extract to a store action -> reuse for installing
      for(const [category, modules] of Object.entries(message)){
        for(const [module, data] of Object.entries(modules)){
          Vue.component(data.main.name, function(resolve){resolve(nativeRequire(data.main.path))})
          data.components.forEach((comp)=>{
            // async load the modules so we only load the visible components and not the unused ones
            Vue.component(comp.fullname, function(resolve){resolve(nativeRequire(comp.path))})
          })
          store.commit('addModule', data)
        }
      }
      console.log('all modules have been loaded ')
    })
  }
}