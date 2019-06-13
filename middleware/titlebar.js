const customTitlebar = require('custom-electron-titlebar');

export default function ({route, app}) {
  if(route.fullPath !== '/update'){
    const test = new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#2a4365'),
      titleHorizontalAlignment: "center",
      menuPosition: "left"
    });
  }
}