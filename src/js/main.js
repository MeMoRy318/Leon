import Difference from './mudules/difference';
import Form from './mudules/form';
import Mask from './mudules/mask';
import VideoPlayer from './mudules/playVideo';
import { MainSlider, SliderMini } from './mudules/slider/index';

window.addEventListener('DOMContentLoaded',()=>{
  new MainSlider({pagesSelector:'.page', buttonsSelector:'.next'}).render();
  new VideoPlayer('.overlay','.play','.close').init();
  
  new SliderMini({
    pagesSelector:'.showup__content-slider',
    nextSelector:'.showup__next',
    prevSelector:'.showup__prev',
    activeClass:'card-active',
  }).init();
  
  new SliderMini({
    pagesSelector:'.modules__content-slider',
    nextSelector:'.modules__info-btns .slick-next',
    prevSelector:'.modules__info-btns .slick-prev',
    activeClass:'card-active',
  }).init();

  new SliderMini({
    pagesSelector:'.feed__slider',
    nextSelector:'.feed__slider .slick-next',
    prevSelector:'.feed__slider .slick-prev',
    activeClass:'feed__item-active',
    autoplay:true
  }).init();

  new Difference('.officerold','.officer__card-item','.plus').init();
  new Difference('.officernew','.officer__card-item','.plus').init();

  new Form('https://jsonplaceholder.typicode.com/users','.join__evolution form').init();
  new Form('https://jsonplaceholder.typicode.com/users','.schedule__form form').init();
  new Mask('[name="phone"]','+1 (___) ___-____').init();
}); 