import VideoPlayer from './mudules/playVideo';
import MainSlider from './mudules/slider/slider-main';

window.addEventListener('DOMContentLoaded',()=>{
  new MainSlider({pagesSelector:'.page', buttonsSelector:'.next'}).render();
  new VideoPlayer('.overlay','.play','.close').init();
});