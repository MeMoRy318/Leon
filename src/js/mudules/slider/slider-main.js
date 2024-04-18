import { Slider } from './slider';

class MainSlider extends Slider {
  constructor(pagesSelector, buttonsSelector, nextSelector, prevSelector) {
    super(pagesSelector, buttonsSelector, nextSelector, prevSelector);
  }

  hideSlides() {
    if (!this.slides) return;
    this.slides.forEach(slide => {
      slide.classList.remove('animated', 'fadeIn');
      slide.style.display = 'none';
    });
  }

  showSlide(index) {
    if (!this.slides) return;
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

    if (this.hanson && index === 2) {
      setTimeout(() => {
        this.hanson.classList.add('animated', 'slideInUp');
        this.hanson.style.display = 'block';
      }, 3000);
    } else if (this.hanson && index !== 2) {
      this.hanson.classList.remove('animated', 'slideInUp');
      this.hanson.style.display = 'none';
    }
  }

  plusSlide(offset) {
    if (!this.slides) return;
    const newIndex = this.slideIndex + offset;
    this.showSlide(newIndex);
  }

  render() {
    try {
      if (this.hanson) {
        this.hanson = document.querySelector('.hanson');
        this.hanson.style.display = 'none';
      }

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

      if (this.prev && this.next) {
        this.prev.forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.plusSlide(-1);
          });
        });
        this.next.forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.plusSlide(1);
          });
        });
      }

      this.showSlide(this.slideIndex);
      // eslint-disable-next-line
    } catch {}
  }
}

export { MainSlider };
