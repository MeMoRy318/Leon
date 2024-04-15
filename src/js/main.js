import VideoPlayer from './mudules/playVideo';
import Sliders from './mudules/sliders';

window.addEventListener('DOMContentLoaded',()=>{
  new Sliders('.page','.next').render();
  new VideoPlayer('.overlay','.play','.close').init();
});