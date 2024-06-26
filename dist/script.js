/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mudules/accordions.js":
/*!**************************************!*\
  !*** ./src/js/mudules/accordions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Accordions {
  constructor(triggerSelector, containerSelector) {
    this.triggers = document.querySelectorAll(triggerSelector);
    this.containers = document.querySelectorAll(containerSelector);
  }
  restyleInitial() {
    this.containers.forEach(container => {
      container.style.cssText = 'display: block; opacity: 0; overflow: hidden; max-height: 0px; transition: all 0.7s ease-out;';
    });
  }
  showContent(index) {
    const container = this.containers[index];
    const scrollHeight = container.scrollHeight;
    container.style.maxHeight = `${scrollHeight}px`;
    container.style.opacity = '1';
  }
  hideContent(index) {
    const container = this.containers[index];
    container.style.opacity = '0';
    container.style.maxHeight = '0px';
  }
  toggleContent(index) {
    const container = this.containers[index];
    const isOpen = container.style.opacity === '1';
    isOpen ? this.hideContent(index) : this.showContent(index);
  }
  init() {
    this.restyleInitial();
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => this.toggleContent(index));
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accordions);

/***/ }),

/***/ "./src/js/mudules/difference.js":
/*!**************************************!*\
  !*** ./src/js/mudules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Difference {
  constructor(officerContainerSelector, blockSelector, showTriggerSelector) {
    this.counter = 0;
    this.officerContainer = document.querySelector(officerContainerSelector);
    try {
      this.showTrigger = this.officerContainer.querySelector(showTriggerSelector);
      this.blocks = this.officerContainer.querySelectorAll(blockSelector);
      // eslint-disable-next-line
    } catch {}
  }
  hideBlocks() {
    this.blocks.forEach((block, index, arr) => {
      if (block !== arr[arr.length - 1]) {
        block.style.display = 'none';
        block.classList.add('animated', 'fadeIn');
      }
    });
  }
  showNextBlock() {
    if (this.counter === this.blocks.length - 2) {
      this.blocks[this.counter].style.display = 'flex';
      this.blocks[this.counter + 1].remove();
    } else {
      this.blocks[this.counter].style.display = 'flex';
    }
    this.counter++;
  }
  init() {
    try {
      this.hideBlocks();
      this.showTrigger.addEventListener('click', () => this.showNextBlock());
      // eslint-disable-next-line
    } catch {}
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Difference);

/***/ }),

/***/ "./src/js/mudules/form.js":
/*!********************************!*\
  !*** ./src/js/mudules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_postData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/postData */ "./src/js/mudules/services/postData.js");

class Form {
  constructor(url, formSelector) {
    this.url = url;
    this.form = document.querySelector(formSelector);
    // eslint-disable-next-line
    try {
      this.emailInput = this.form.querySelector('[name="email"]');
    } catch {}
    this.message = {
      loading: 'Loading...',
      success: 'Thank you! We will contact you soon!',
      failure: 'Something went wrong...'
    };
  }
  init() {
    try {
      this.emailInput.addEventListener('input', () => {
        this.emailInput.value = this.emailInput.value.replace(/[^\w@.]/g, '');
      });
      this.form.addEventListener('submit', async event => {
        event.preventDefault();
        const status = document.createElement('div');
        status.style.cssText = `
        margin-top: 15px;
        font-size: 18px;
        color: grey;
    `;
        status.innerText = this.message.loading;
        this.form.parentElement.appendChild(status);
        try {
          const data = Object.fromEntries(new FormData(this.form).entries());
          this.form.reset();
          const postData = new _services_postData__WEBPACK_IMPORTED_MODULE_0__["default"](this.url, data);
          await postData.sendRequest();
          status.innerText = this.message.success;
        } catch {
          status.innerText = this.message.failure;
        } finally {
          setTimeout(() => status.remove(), 3000);
        }
      });
      // eslint-disable-next-line
    } catch {}
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./src/js/mudules/mask.js":
/*!********************************!*\
  !*** ./src/js/mudules/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Mask {
  constructor(phoneSelector, matrix) {
    this.phoneSelector = phoneSelector;
    this.matrix = matrix;
    this.inputs = document.querySelectorAll(phoneSelector);
  }
  setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  createMask(event) {
    let input = event.target;
    let i = 0,
      def = this.matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    input.value = this.matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (event.type === 'blur') {
      if (input.value.length == 2) {
        input.value = '';
      }
    } else {
      this.setCursorPosition(input.value.length, input);
    }
  }
  init() {
    this.inputs.forEach(input => {
      input.addEventListener('input', e => this.createMask(e));
      input.addEventListener('focus', e => this.createMask(e));
      input.addEventListener('blur', e => this.createMask(e));
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mask);

/***/ }),

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
        'onStateChange': e => this.onPlayerStateChange(e)
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
            this.player.loadVideoById({
              videoId
            });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ }),

/***/ "./src/js/mudules/services/postData.js":
/*!*********************************************!*\
  !*** ./src/js/mudules/services/postData.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class PostData {
  constructor(url, data, options = {}) {
    this.url = url.trim();
    this.data = data;
    this.options = options;
  }
  async sendRequest() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.data),
      ...this.options
    };
    const response = await fetch(this.url, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostData);

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
      if (this.prev && this.next) {
        this.prev.forEach(item => {
          item.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            this.plusSlide(-1);
          });
        });
        this.next.forEach(item => {
          item.addEventListener('click', e => {
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
    try {
      this.pages.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;`;
      this.resetSlideStyles();
      this.pages.children[0].classList.add(this.activeClass);
      this.next[0].addEventListener('click', () => this.nextSlide());
      this.prev[0].addEventListener('click', () => this.prevSlide());
      if (this.autoplay) {
        this.startAutoplay();
        this.pages.addEventListener('mouseover', () => clearInterval(this.timerId));
        this.pages.addEventListener('mouseout', () => this.startAutoplay());
      }
      // eslint-disable-next-line
    } catch {}
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
    this.next = document.querySelectorAll(nextSelector);
    this.prev = document.querySelectorAll(prevSelector);
    // eslint-disable-next-line
    try {
      this.slides = Array.from(this.pages.children);
    } catch (e) {}
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
/* harmony import */ var _mudules_accordions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mudules/accordions */ "./src/js/mudules/accordions.js");
/* harmony import */ var _mudules_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mudules/difference */ "./src/js/mudules/difference.js");
/* harmony import */ var _mudules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mudules/form */ "./src/js/mudules/form.js");
/* harmony import */ var _mudules_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mudules/mask */ "./src/js/mudules/mask.js");
/* harmony import */ var _mudules_playVideo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mudules/playVideo */ "./src/js/mudules/playVideo.js");
/* harmony import */ var _mudules_slider_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mudules/slider/index */ "./src/js/mudules/slider/index.js");






window.addEventListener('DOMContentLoaded', () => {
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_5__.MainSlider({
    pagesSelector: '.page',
    buttonsSelector: '.next'
  }).render();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_5__.MainSlider({
    pagesSelector: '.moduleapp',
    buttonsSelector: '.moduleapp .sidecontrol__controls .next',
    prevSelector: '.prevmodule',
    nextSelector: '.nextmodule'
  }).render();
  new _mudules_playVideo__WEBPACK_IMPORTED_MODULE_4__["default"]('.overlay', '.play', '.close').init();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_5__.SliderMini({
    pagesSelector: '.showup__content-slider',
    nextSelector: '.showup__next',
    prevSelector: '.showup__prev',
    activeClass: 'card-active'
  }).init();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_5__.SliderMini({
    pagesSelector: '.modules__content-slider',
    nextSelector: '.modules__info-btns .slick-next',
    prevSelector: '.modules__info-btns .slick-prev',
    activeClass: 'card-active'
  }).init();
  new _mudules_slider_index__WEBPACK_IMPORTED_MODULE_5__.SliderMini({
    pagesSelector: '.feed__slider',
    nextSelector: '.feed__slider .slick-next',
    prevSelector: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active',
    autoplay: true
  }).init();
  new _mudules_difference__WEBPACK_IMPORTED_MODULE_1__["default"]('.officerold', '.officer__card-item', '.plus').init();
  new _mudules_difference__WEBPACK_IMPORTED_MODULE_1__["default"]('.officernew', '.officer__card-item', '.plus').init();
  new _mudules_form__WEBPACK_IMPORTED_MODULE_2__["default"]('https://jsonplaceholder.typicode.com/users', '.join__evolution form').init();
  new _mudules_form__WEBPACK_IMPORTED_MODULE_2__["default"]('https://jsonplaceholder.typicode.com/users', '.schedule__form form').init();
  new _mudules_mask__WEBPACK_IMPORTED_MODULE_3__["default"]('[name="phone"]', '+1 (___) ___-____').init();
  new _mudules_accordions__WEBPACK_IMPORTED_MODULE_0__["default"]('.module__info-show .plus', '.msg').init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map