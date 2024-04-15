class Slider {
  constructor({pagesSelector ='', buttonsSelector = ''} = {}) {
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.pages = document.querySelector(pagesSelector);
    this.slides = Array.from(this.pages.children);
    this.slideIndex = 0;
  }
}
  
export default Slider;
  