class Sliders {
  constructor(pagesSelector, buttonsSelector) {
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.pages = document.querySelector(pagesSelector);
    this.slides = Array.from(this.pages.children);
    this.slideIndex = 0;
  }
  
  hideSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove('animated', 'fadeIn');
      slide.style.display = 'none';
    });
  }
  
  showSlide(index) {
    this.hideSlides();
    if (index < 0) {
      this.slideIndex = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      this.slideIndex = 0;
    } else {
      this.slideIndex = index;
    }
    const currentSlide = this.slides[this.slideIndex];
    currentSlide.classList.add('animated', 'fadeIn');
    currentSlide.style.display = 'block';

    if(this.hanson && index === 2){
      setTimeout(()=>{
        this.hanson.classList.add('animated','slideInUp');
        this.hanson.style.display = 'block';
      },3000);
    }else if(this.hanson && index !== 2){
      this.hanson.classList.remove('animated','slideInUp');
      this.hanson.style.display = 'none';
    }
  }
  
  plusSlide(offset) {
    const newIndex = this.slideIndex + offset;
    this.showSlide(newIndex);
  }
  
  render() {
    this.hanson = document.querySelector('.hanson');
    this.hanson.style.display = 'none';
    
    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.plusSlide(1);
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 0;
        this.showSlide(this.slideIndex);
      });
    });
  
    this.showSlide(this.slideIndex);
  }
}
  
export default Sliders;
  