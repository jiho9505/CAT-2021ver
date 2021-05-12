export default class Dialog {

    data = null;
  
    constructor() {
  
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
                <div class="Modal">
                    <div class="overlay"></div>
                    <div class="_content"></div>
                </div>
              `
  
      this.element = TEMPLATE.content.firstElementChild;
      
      const overlay = this.element.querySelector('.overlay');

      overlay.onclick = () => {
         this.element.style.display = 'none'
       }
  
      window.addEventListener("keyup", e => {
        if(e.keyCode === 27){
            this.element.style.display = 'none'
        }
      });
    
    }
  
    attachTo(parent) {
      parent.appendChild(this.element)
    }
  
    setState({data}) {
        this.data = data;
        this.render();
    }
  
    render() {
  
        this.content = document.querySelector('._content');
        const img = this.data.image[0] === '/' ? this.data.image.slice(1) : this.data.image;
        this.content.innerHTML = `
            <img width="700px" height="700px" src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/${img}">
        `
        this.element.style.display = 'block'
    
    }
  }
