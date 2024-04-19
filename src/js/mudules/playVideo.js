class VideoPlayer {
  constructor(overlaySelector, triggerSelector, closeSelector) {
    this.overlay = document.querySelector(overlaySelector);
    this.triggers = document.querySelectorAll(triggerSelector);
    this.close = document.querySelector(closeSelector);
    this.player = null;
    this.target = null;
  }

  onPlayerStateChange(event) {
    const parentElement = this.target.parentNode.nextElementSibling;
    if (event.data === 0 && parentElement && parentElement.classList.contains('module__video-item')) {
      this.handleVideoPlayback(parentElement);
    }
  }

  handleVideoPlayback(parentElement) {
    const icon = this.target.querySelector('svg').cloneNode(true);
    const playCircle = parentElement.querySelector('.play__circle');
    
    parentElement.style.filter = 'none';
    parentElement.style.opacity = '1';
    parentElement.setAttribute('data-disabled', 'false');
    playCircle.innerHTML = '';
    playCircle.appendChild(icon);
  }

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url,
      events: {
        'onStateChange': (e) => this.onPlayerStateChange(e)
      }
    });
  }

  canPlayVideo(trigger) {
    return !trigger.parentNode.getAttribute('data-disabled') || trigger.parentNode.getAttribute('data-disabled') !== 'true';
  }

  bindTriggers() {
    this.triggers.forEach((trigger, index) => {
      if (index % 2 && trigger.parentNode.classList.contains('module__video-item')) {
        trigger.parentNode.setAttribute('data-disabled', 'true');
      }
      trigger.addEventListener('click', () => {
        const videoId = trigger.getAttribute('data-url');
        if (this.canPlayVideo(trigger)) {
          this.overlay.style.display = 'flex';
          if (!this.player) {
            this.createPlayer(videoId);
          } else {
            this.player.loadVideoById({ videoId });
          }
          this.target = trigger;
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.player.stopVideo();
      this.overlay.style.display = 'none';
    });

    this.overlay.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  init() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}

export default VideoPlayer;
