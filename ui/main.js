import {Socket, Presence} from "./phoenix";

let App = {
  init(){
    if(!true){ return }
    this.connectButton = document.getElementById("connect-button")
    this.bind()
  },

  bind(){
      this.connectButton.addEventListener("click", e => {
          alert("hoge")
      })
  },
}
App.init()
