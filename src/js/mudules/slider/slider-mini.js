import { Slider } from './slider';

class SliderMini extends Slider {
  constructor({ pagesSelector, nextSelector, prevSelector, activeClass,autoplay }) {
    super({ pagesSelector, nextSelector, prevSelector, activeClass,autoplay });
  }

  resetSlideStyles() {
    this.slides.forEach(slider => {
      slider.classList.remove(this.activeClass);
    });
  }

  nextSlide() {
    this.resetSlideStyles();
    const nextSlide = this.pages.children[1];
    if ( nextSlide.tagName === 'BUTTON') {
      this.pages.append( this.pages.children[0], nextSlide, this.pages.children[2]);
    } else {
      this.pages.appendChild(this.pages.children[0]);
    }
    this.pages.children[0].classList.add(this.activeClass);
  }

  prevSlide() {
    this.resetSlideStyles();
    const lastSlide = this.pages.children[this.slides.length - 1];
    if (lastSlide.tagName === 'BUTTON') {
      this.pages.insertBefore(this.pages.children[this.slides.length - 1], this.pages.children[3]);
      this.pages.insertBefore(this.pages.children[this.slides.length - 2], this.pages.children[3]);
      this.pages.insertBefore(this.pages.children[this.slides.length - 3], this.pages.children[0]);
    } else {
      this.pages.insertBefore(this.pages.children[this.slides.length - 1], this.pages.children[0]);
    }
    this.pages.children[0].classList.add(this.activeClass);
  }

  startAutoplay(){
    this.timerId = setInterval(() => this.nextSlide(),5000);
  }

  init() {
    this.pages.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;`;
    this.resetSlideStyles();
    this.pages.children[0].classList.add(this.activeClass);

    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => this.prevSlide());
    
    if(this.autoplay){
      this.startAutoplay();

      this.pages.addEventListener('mouseover',()=> clearInterval(this.timerId));
      this.pages.addEventListener('mouseout',()=> this.startAutoplay());
    }
    
  }
}

export { SliderMini };
