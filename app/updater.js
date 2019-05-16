const {BrowserWindow, dialog} = require('electron')
const windowStateKeeper = require('electron-window-state')
const {autoUpdater} = require("electron-updater")

let updaterWin = null
exports.win = null

const updateWin = function () {
  //create window state manager
  let updaterWindowState = windowStateKeeper(
    { // default path = app.getPath('userData') = Appdata\Roaming\streamer-buddy
      defaultWidth: 300,
      defaultHeight: 400,
      file: 'updater-window-state.json'
    })
  if (updaterWin !== null) {
    return
  }
  updaterWin = new BrowserWindow({
    webPreferences:{
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'static/icon.png'),
    x: updaterWindowState.x,
    y: updaterWindowState.y,
    width: updaterWindowState.width,
    height: updaterWindowState.height,
    frame: false,
    titleBarStyle: 'hidden',
    show: false
  });

  // Add listeners to window
  updaterWindowState.manage(updaterWin);
  updaterWin.once('ready-to-show', () => {
    updaterWin.show()
  })
  updaterWin.on('closed', () => updaterWin = null)
  return updaterWin.loadFile(`${__dirname}/NoNuxt/update.html`)
}

exports.checkForUpdate = async function () {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false
  autoUpdater.signals.progress(({percent}) => {
    console.log(percent)
    if (updaterWin !== null) updaterWin.webContents.send('progress', percent)
  })

  try {
    let updateCheck = await autoUpdater.checkForUpdates()
    if (autoUpdater.currentVersion < updateCheck.updateInfo.version) {
      dialog.showMessageBox(exports.win,{
        type: "question",
        buttons: ["Yes", "Cancel"],
        title: 'Update Available',
        message: "An update is available for download.\n do you want to download and install it now?"
      }, async (response) => {
        if (response === 0) {
          await updateWin()
          try {
            await autoUpdater.downloadUpdate();

            let sleep = function (ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }

            await sleep(1000)
            autoUpdater.quitAndInstall(false, true)
          } catch (e) {
            console.log('failed to download update')
            console.log(e)
          }
        } // user doesn't want to update
      })
    } // no new version
  } catch (rejected) { // update server not available
    console.log('failed to check for update')
    console.log(rejected)
  }
}