export default class Loading {

    constructor() {
    
    
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
                <div class="Modal">
                    <div class="content">
                        <img width="700px" height="700px" src="./assets/nyan-cat.gif">
                    </div>
                </div>
              `
    
      this.element = TEMPLATE.content.firstElementChild;
    
    }
    
    attachTo(parent) {
      parent.appendChild(this.element)
    }
    
    open() {
        this.element.style.display = 'block'
    }
    
    close() {
        this.element.style.display = 'none'
    }
    
    }