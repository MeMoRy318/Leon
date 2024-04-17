import PostData from './services/postData';

class Form {
  constructor( url, formSelector ){
    this.url = url;
    this.form = document.querySelector(formSelector);
    // eslint-disable-next-line
    try{this.emailInput = this.form.querySelector('[name="email"]');}catch{}
    this.message = {
      loading: 'Loading...',
      success: 'Thank you! We will contact you soon!',
      failure: 'Something went wrong...'
    };
  }

  init(){
    try{
      this.emailInput.addEventListener('input',()=>{
        this.emailInput.value = this.emailInput.value.replace(/[^\w@.]/g, '');
      });
      
      this.form.addEventListener('submit', async (event)=>{
        event.preventDefault();
        const status = document.createElement('div');
        status.style.cssText = `
        margin-top: 15px;
        font-size: 18px;
        color: grey;
    `;
        status.innerText = this.message.loading;
        this.form.parentElement.appendChild(status);
  
        try{
          const data = Object.fromEntries(new FormData(this.form).entries());
          this.form.reset();
          const postData = new PostData(this.url,data);
          await postData.sendRequest();
          status.innerText = this.message.success;
        }catch{
          status.innerText = this.message.failure;
        }finally{
          setTimeout(()=>status.remove(),3000);
        }
      
      });
      // eslint-disable-next-line
    }catch{}
  }
}

export default Form;