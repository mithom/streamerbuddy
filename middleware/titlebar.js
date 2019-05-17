const customTitlebar = require('custom-electron-titlebar');

export default function ({route}) {
  if(route.fullPath !== '/update'){
    new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#444'),
      titleHorizontalAlignment: "center",
      menuPosition: "bottom"
    });
  }
}