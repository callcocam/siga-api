const document: any = window.document;
let FullScreen = {
    body: this.body,
    fullscreenBtn: this.fullscreenBtn,
    //turn on full screen
    // Thanks to http://davidwalsh.name/fullscreen
    launchFullscreen: function(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    exitFullscreen: function(element) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    //toggle screen
    toggle_fullscreen: function() {
      var $this = this;
      var fullscreenEnabled =
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled;
      if (fullscreenEnabled) {
        if (
          !document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement
        ) {
          $this.launchFullscreen(document.documentElement);
        } else {
          $this.exitFullscreen();
        }
      }
    },
    //init sidemenu
    init: function() {
      var $this = this;
      //bind
      $this.toggle_fullscreen();
      return false;
    }
  }
export default{FullScreen}