const electron = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
const { autoUpdater } = require("electron-updater")

/*
**  Nuxt
*/
// Read in Nuxt configuration
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder

// Init Nuxt.js
const nuxt = new Nuxt(config)
const server = http.createServer(nuxt.render)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(err => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
** Electron
*/
let win = null // Current window
const app = electron.app
const newWin = async (url='') => {
  // open window to ask if should update, if so, open another window for download progress
  // fix updater yml file
	
  //create window state manager
  let mainWindowState = windowStateKeeper(
    { // default path = app.getPath('userData') = Appdata\Roaming\streamer-buddy
      defaultWidth: 1200,
      defaultHeight: 600,
      file: 'main-window-state.json'
    })
  await nuxt.ready();
  win = new electron.BrowserWindow({
    nodeIntegration: false,
    icon: path.join(__dirname, 'static/icon.png'),
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    titleBarStyle: 'hidden'
  });

  // Add listeners to window
  mainWindowState.manage(win);
  win.on('closed', () => win = null)

  // Load initial page
  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id).then(name => {
      console.log(`Added Extension:  ${name}`)
      win.webContents.openDevTools()
    }).catch(err => console.log('An error occurred: ', err))

    // Wait for nuxt to build - shouldn't be needed anymore since await nuxt.ready()has been added
    const pollServer = () => {
      http.get(_NUXT_URL_+url, (res) => {
        if (res.statusCode === 200) { win.loadURL(_NUXT_URL_+url) } else { setTimeout(pollServer, 300) }
      }).on('error', pollServer)
    }
    pollServer()
  } else { return win.loadURL(_NUXT_URL_+url) }
}

const checkForUpdate = async () => {
  let updateBar = null

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false
  autoUpdater.signals.progress(({percent})=>{
    console.log(percent)
    win.webContents.send('progress', percent)
  })
  autoUpdater.signals.updateDownloaded((info) => {
    //updateBar.setProgress(100)
    console.log('----------------------update downloaded')
    autoUpdater.quitAndInstall(false, true)
  })

  try{
    let updateCheck = await autoUpdater.checkForUpdates()
    if(autoUpdater.currentVersion < updateCheck.updateInfo.version){
      let response = electron.dialog.showMessageBox({
        type:"question",
        buttons:["Yes","Cancel"],
        title:'Update Available',
        message:"An update is available for download.\n do you want to download and install it now?"
      })
      if(response === 0){
        autoUpdater.downloadUpdate();
        newWin('/update')
      }else {
        await newWin()
      }
    }else{
      await newWin()
    }

    //updateBar = smalltalk.progress('Updating', 'Download progress', {cancel: false}) // move this to html shown in the file
    //updateBar.setProgress(percent)
  }catch (rejected) { // either no update available or user doesn't want to install it.
    await newWin()
  }
}

// registering all events
autoUpdater.on('update-downloaded', (info) => {autoUpdater.quitAndInstall()})
app.on('ready', checkForUpdate)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
app.on('activate', () => win === null && newWin())