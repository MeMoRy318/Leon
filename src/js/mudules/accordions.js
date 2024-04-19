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
  
export default Accordions;
  