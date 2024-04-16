/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mudules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/mudules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class VideoPlayer {
  constructor(overlaySelector, tiggerSelector, closeSelector) {
    this.overlay = document.querySelector(overlaySelector);
    this.triggers = document.querySelectorAll(tiggerSelector);
    this.close = document.querySelector(closeSelector);
    this.player = null;
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url
    });
  }
  bindTriggers() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        this.overlay.style.display = 'flex';
        if (!this.player) {
          const videoId = trigger.getAttribute('data-url');
          this.createPlayer(videoId);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ }),

/***/ "./src/js/mudules/slider/index.js":
/*!****************************************!*\
  !*** ./src/js/mudules/slider/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainSlider: () => (/* reexport safe */ _slider_main__WEBPACK_IMPORTED_MODULE_1__.MainSlider),
/* harmony export */   Slider: () => (/* reexport safe */ _slider__WEBPACK_IMPORTED_MODULE_0__.Slider),
/* harmony export */   SliderMini: () => (/* reexport safe */ _slider_mini__WEBPACK_IMPORTED_MODULE_2__.SliderMini)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/mudules/slider/slider.js");
/* harmony import */ var _slider_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider-main */ "./src/js/mudules/slider/slider-main.js");
/* harmony import */ var _slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider-mini */ "./src/js/mudules/slider/slider-mini.js");




/***/ }),

/***/ "./src/js/mudules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/mudules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainSlider: () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/mudules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__.Slider {
  constructor(pagesSelector, buttonsSelector) {
    super(pagesSelector, buttonsSelector);
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
    const newIndex = this.slideIndex + offset;
    this.showSlide(newIndex);
  }
  render() {
    this.hanson = document.querySelector('.hanson');
    this.hanson.style.display = 'none';
    this.buttons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.plusSlide(1);
      });
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 0;
        this.showSlide(this.slideIndex);
      });
    });
    this.showSlide(this.slideIndex);
  }
}


/***/ }),

/***/ "./src/js/mudules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/mudules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SliderMini: () => (/* binding */ SliderMini)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/mudules/slider/slider.js");

class SliderMini extends _slider__WEBPACK_IMPORTED_MODULE_0__.Slider {
  constructor({
    pagesSelector,
    nextSelector,
    prevSelector,
    activeClass,
    autoplay
  }) {
    super({
      pagesSelector,
      nextSelector,
      prevSelector,
      activeClass,
      autoplay
    });
  }
  resetSlideStyles() {
    this.slides.forEach(slider => {
      slider.classList.remove(this.activeClass);
    });
  }
  nextSlide() {
    this.resetSlideStyles();
    const nextSlide = this.pages.children[1];
    if (nextSlide.tagName === 'BUTTON') {
      this.pages.append(this.pages.children[0], nextSlide, this.pages.children[2]);
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
  startAutoplay() {
    this.timerId = setInterval(() => this.nextSlide(), 5000);
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
    if (this.autoplay) {
      this.startAutoplay();
      this.pages.addEventListener('mouseover', () => clearInterval(this.timerId));
      this.pages.addEventListener('mouseout', () => this.startAutoplay());
    }
  }
}


/***/ }),

/***/ "./src/js/mudules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/mudules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    pagesSelector = null,
    buttonsSelector = null,
    nextSelector = null,
    prevSelector = null,
    activeClass = '',
    autoplay = false
  } = {}) {
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.pages = document.querySelector(pagesSelector);
    this.next = document.querySelector(nextSelector);
    this.prev = document.querySelector(prevSelector);
    this.slides = Array.from(this.pages.children);
    this.slideIndex = 0;
    this.activeClass = activeClass;
    this.autoplay = autoplay;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mudules_playVideo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mudules/playVideo */ "./src/js/mudules/playVideo.js");
/* harmony import */ var _mudules_slider_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mudules/slider/index */ "./src/js/mudules/slider/index.js");


window.addEventListener('DOMContentLoaded', () => {
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_1__.MainSlider({
    pagesSelector: '.page',
    buttonsSelector: '.next'
  }).render();
  new _mudules_playVideo__WEBPACK_IMPORTED_MODULE_0__["default"]('.overlay', '.play', '.close').init();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_1__.SliderMini({
    pagesSelector: '.showup__content-slider',
    nextSelector: '.showup__next',
    prevSelector: '.showup__prev',
    activeClass: 'card-active'
  }).init();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_1__.SliderMini({
    pagesSelector: '.modules__content-slider',
    nextSelector: '.modules__info-btns .slick-next',
    prevSelector: '.modules__info-btns .slick-prev',
    activeClass: 'card-active'
  }).init();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_1__.SliderMini({
    pagesSelector: '.feed__slider',
    nextSelector: '.feed__slider .slick-next',
    prevSelector: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active',
    autoplay: true
  }).init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map