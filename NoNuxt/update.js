const {ipcRenderer} = require('electron')

function main() {
  let pBar = document.getElementById('download');
  let updateProgress = function(value) {
    pBar.value = value;
    console.log(value)
    pBar.getElementsByTagName('span')[0].innerHTML = Math.floor(value).toString();
  }
  ipcRenderer.on('progress',(event, message)=>{
    if (message <100){
      updateProgress(message)
    }else{
      updateProgress(message)
    }
  })
}

window.onload = main;