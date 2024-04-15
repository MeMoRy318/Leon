class VideoPlayer {
  constructor(overlaySelector,tiggerSelector,closeSelector){
    this.overlay = document.querySelector(overlaySelector);
    this.triggers = document.querySelectorAll(tiggerSelector);
    this.close = document.querySelector(closeSelector);
    this.player = null;
  }

  createPlayer(url){
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url,
    });
  }

  bindTriggers(){
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click',()=>{
        this.overlay.style.display = 'flex';

        if(!this.player){
          const videoId = trigger.getAttribute('data-url');
          this.createPlayer(videoId);
        }
      });
    });
  }

  bindCloseBtn(){
    this.close.addEventListener('click',()=> {
      this.player.stopVideo();
      this.overlay.style.display = 'none';
    });

    this.overlay.addEventListener('click',()=>{
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  init(){
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}

export default VideoPlayer;