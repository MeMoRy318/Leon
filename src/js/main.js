import Sliders from './mudules/sliders';

window.addEventListener('DOMContentLoaded',()=>{
  const sliders = new Sliders('.page','.next');
  sliders.render();
});