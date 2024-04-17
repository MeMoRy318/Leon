class Mask {
  constructor(phoneSelector, matrix) {
    this.phoneSelector = phoneSelector;
    this.matrix = matrix;
    this.inputs = document.querySelectorAll(phoneSelector);
  }

  setCursorPosition(pos, elem){
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

  createMask(event){
    let input = event.target;
    let i = 0,
      def = this.matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    input.value = this.matrix.replace(/./g, function(a) {
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
      input.addEventListener('input',(e)=> this.createMask(e));
      input.addEventListener('focus',(e)=> this.createMask(e));
      input.addEventListener('blur',(e)=> this.createMask(e));
    });
  }
}

export default Mask;
