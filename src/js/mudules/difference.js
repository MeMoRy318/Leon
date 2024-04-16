class Difference {
  constructor(officerContainerSelector, blockSelector, showTriggerSelector) {
    this.counter = 0;
    this.officerContainer = document.querySelector(officerContainerSelector);
    this.showTrigger = this.officerContainer.querySelector(showTriggerSelector);
    this.blocks = this.officerContainer.querySelectorAll(blockSelector);
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
    this.hideBlocks();
    this.showTrigger.addEventListener('click', () => this.showNextBlock());
  }
}
  
export default Difference;
  