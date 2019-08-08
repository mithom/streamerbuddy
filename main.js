const {app, BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const http = require('http')
const {Nuxt, Builder} = require('nuxt')
const updater = require('./app/updater')
const {createModuleLoaderHook} = require('./app/module-loader')
const initOAuth = require('./app/OAuth')
require('./app/module-installer')

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
  console.log('GPU rendering has been disabled to allow for streaming during development')
  app.commandLine.appendSwitch("disable-gpu")

  const builder = new Builder(nuxt)
  builder.build().catch(err => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Listen the server
server.listen(nuxt.options.server.port)
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
** Electron
*/
let win = null // Main window

const mainWin = async function (url = '') {
  // fix updater yml file
  await nuxt.ready();
  //create window state manager
  let mainWindowState = windowStateKeeper(
    { // default path = app.getPath('userData') = Appdata\Roaming\streamer-buddy
      defaultWidth: 1200,
      defaultHeight: 600,
      file: 'main-window-state.json'
    })
  if (win !== null) {
    return
  }
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'static/icon.png'),
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    titleBarStyle: 'hidden',
    show: false
  });
  updater.win = win;

  // Add listeners to window
  mainWindowState.manage(win);
  win.on('closed', () => win = null)
  win.once('ready-to-show', () => {
    win.show()
  })

  // Load initial page
  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const {default: installExtension, VUEJS_DEVTOOLS} = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id).then(name => {
      console.log(`Added Extension:  ${name}`)
      win.webContents.openDevTools()
    }).catch(err => console.log('An error occurred: ', err))

    // Wait for nuxt to build - shouldn't be needed anymore since await nuxt.ready()has been added
    const pollServer = () => {
      if (win !== null) {
        http.get(_NUXT_URL_ + url, async (res) => {
          if (res.statusCode === 200) {
            if (win !== null) {
              await win.loadURL(_NUXT_URL_ + url).catch(() => {
                setTimeout(pollServer, 300)
              })
            }
          } else {
            setTimeout(pollServer, 300)
          }
        }).on('error', pollServer)
      }
    }
    pollServer()
  } else if (win !== null) {
    try {
      await win.loadURL(_NUXT_URL_ + url)
    } catch (e) {
      console.log('failed to load URL')
      console.log(e)
    }
  }
}

const initProgram = async function () {
  try {
    createModuleLoaderHook()
    await Promise.all([
      updater.checkForUpdate(),
      mainWin()
    ])
    initOAuth(win)
  } catch (e) {
    console.log('something went wrong during startup')
    console.log(e)
  }
}

// registering all events
app.on('ready', initProgram)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
app.on('activate', () => win === null && mainWin())
