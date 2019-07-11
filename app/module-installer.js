const {ipcMain, app} = require('electron')

ipcMain.on('install-module', (event, components)=>{
  console.log(components)
})
