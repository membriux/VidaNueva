
const MENSAJE_VIDEOS = 3
const CHURCH_VIDEOS = 1

function main(){
  setMainVideoSource()
  
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max+1));
  }

function setMainVideoSource() {
    let mainVideoSource = $('#main_video')
    let currentWindow = window.location.pathname
    
    var randomVideo = ''

    if (currentWindow == '/') {
      randomVideo = `img/videos/church${getRandomInt(CHURCH_VIDEOS)}.mp4`
    } else if (currentWindow == '/mensajes') {
      randomVideo = `img/videos/mensaje${getRandomInt(MENSAJE_VIDEOS)}.mp4`
    }
    
    mainVideoSource.attr('src', randomVideo)
    $('video')[0].load()
}


main()

