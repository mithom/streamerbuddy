import VuexPersistence from 'vuex-persist'
const {remote:{app}} = require('electron')
import path from 'path'
import fs from 'fs'

//storage.setDataPath(path.join(app.getPath('userData'),'app','store'))
const filePath = path.join(app.getPath('userData'),'app','store')

const set = async function(key, json, ...options){
  try{
    const fh = await fs.promises.open(path.join(filePath, `${key}.json`), 'w')
    await fh.writeFile(json, 'utf-8')
    await fh.close()
  }catch (e) {
    if(e.hasOwnProperty('code') && e.code === 'ENOENT' && (options?.retry ? options.retry : true)){
      await fs.promises.mkdir(filePath, {recursive: true})
      await set(key, json, {retry: false, ...options})
    }else{
      throw e
    }
  }
}

const get = async function(key, ...options){
  try{
    const fh = await fs.promises.open(path.join(filePath, `${key}.json`), 'r')
    const data = await fh.readFile('utf-8')
    await fh.close()
    return data
  }catch (e) {
    return {}
  }
}

export default new VuexPersistence({
  asyncStorage: true,
  storage: {
    getItem: get,
    setItem: set,
  },
  reducer: (state)=>{
    return Object.keys(state)
      .filter((key)=>!['appModules', 'enums', 'moduleStore','hooks'].includes(key))
      .reduce((obj, key)=>{
        obj[key] = state[key]
        return obj
      },{})
  }
})
