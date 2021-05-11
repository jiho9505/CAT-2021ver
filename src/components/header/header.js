export default class Header {

    data = null;
  
    constructor({onClick}) {
  
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
              <nav class="Breadcrumb">
              </nav>
              `
  
      this.element = TEMPLATE.content.firstElementChild;

      this.onClick = onClick;
        
      this.element.addEventListener('click', (e) => {
            if(e.target.className === 'items'){
                this.onClick(e.target.dataset.index);
            }
            
      })
    }
  
    attachTo(parent) {
      parent.appendChild(this.element)
    }
  
    setState(newData) {
        this.data = newData;
        this.render();
    }
  
    render() {
        this.element.innerHTML = this.data
            .map(
            (name,index) => `
            <div class="items" data-index=${index}>
                ${name}
            </div>
            `
            )
            .join("");
    }
  }