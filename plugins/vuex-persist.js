import VuexPersistence from 'vuex-persist'
import storage from 'electron-json-storage'
const {remote:{app}} = require('electron')
import path from 'path'
import {promisify} from "util";

storage.setDataPath(path.join(app.getPath('userData'),'app','store'))

const get = promisify(storage.get)
const set = promisify(storage.set)
const remove = promisify(storage.remove)
const clear = promisify(storage.clear)

export default
new VuexPersistence({
  asyncStorage: true,
  strictMode: true,
  storage: {
    getItem: get,
    setItem: set,
    removeItem: remove,
    clear: clear
  },
  reducer: (state)=>{
    return Object.keys(state)
      .filter((key)=>!['appModules', 'enums', 'moduleStore'].includes(key))
      .reduce((obj, key)=>{
        obj[key] = state[key]
        return obj
      },{})
  }
})