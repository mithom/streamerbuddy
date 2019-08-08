const {ipcMain, BrowserWindow} = require('electron')
const ClientOAuth2 = require('client-oauth2')
const path = require('path')

const OAuthClient = new ClientOAuth2({
  redirectUri: `${process.env.baseUrl}/connections/callback`
})

module.exports = function(mainWin){
  ipcMain.on('openAuthWindow',async function(event, options){
    let authWin = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
      icon: path.join(__dirname, 'static/icon.png'),
      frame: false,
      titleBarStyle: 'hidden',
    });

    const onRequestAuthData =  function(event){
      if(event.sender === authWin.webContents){
        ipcMain.on('finishAuth', finishAuth)

        event.sender.send('authData', options)
      }
    }

    const finishAuth = function(event, args){
      if(event.sender === authWin.webContents){
        mainWin.webContents.send('finishAuth', args.user)
        ipcMain.removeListener('finishAuth', finishAuth)
      }
    }

    authWin.on('closed', ()=>{
      authWin = null
      ipcMain.removeListener('requestAuthData', onRequestAuthData)
      ipcMain.removeListener('finishAuth', finishAuth)
    })
    ipcMain.on('requestAuthData', onRequestAuthData)

    await authWin.loadURL(OAuthClient.token.getUri(options))
  })
}
