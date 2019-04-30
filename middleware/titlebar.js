export default function ({route}) {
  const customTitlebar = require('custom-electron-titlebar');

  if(route.fullPath !== '/update'){
    new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#444')
    });
  }
}