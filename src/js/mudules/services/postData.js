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
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(this.data),
      ...this.options, 
    };
     
    const response = await fetch(this.url, requestOptions);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  }
}
  
export default PostData;
  