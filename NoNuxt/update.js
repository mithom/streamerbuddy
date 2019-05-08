function main() {
  var pBar = document.getElementById('download');
  var updateProgress = function(value) {
    pBar.value = value;
    console.log(value)
    pBar.getElementsByTagName('span')[0].innerHTML = Math.floor(value);
  }
  const {ipcRenderer} = require('electron')
  ipcRenderer.on('progress',(event, message)=>{
    if (message <100){
      updateProgress(message)
    }else{
      updateProgress(message)
    }
  })
}

window.onload = main;