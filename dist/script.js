/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mudules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/mudules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  }
  plusSlide(offset) {
    const newIndex = this.slideIndex + offset;
    this.showSlide(newIndex);
  }
  render() {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sliders);

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
/* harmony import */ var _mudules_sliders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mudules/sliders */ "./src/js/mudules/sliders.js");

window.addEventListener('DOMContentLoaded', () => {
  const sliders = new _mudules_sliders__WEBPACK_IMPORTED_MODULE_0__["default"]('.page', '.next');
  sliders.render();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map