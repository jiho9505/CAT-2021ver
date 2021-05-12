export default class Body {

    data = null;
    index = 0;
    isRoot = true;
  
    constructor({onClickDir,onClickFile,onClickPrev}) {
      
      const TEMPLATE = document.createElement("template");
      
      TEMPLATE.innerHTML = `
                <div class="Nodes">
                </div>
              `
      
      this.element = TEMPLATE.content.firstElementChild;
    
    
        this.onClickDir = onClickDir;
        this.onClickFile = onClickFile;
        this.onClickPrev = onClickPrev;
  
        this.element.addEventListener('click', (e) => { 
            this.index = e.target.dataset.index;
            
            if(e.target.dataset.prop === 'prev'){
                this.onClickPrev();
            }else if(e.target.dataset.prop === 'FILE'){
                this.onClickFile(this.data[this.index].filePath);
            }else if(e.target.dataset.prop === 'DIRECTORY'){
                this.onClickDir(this.data[this.index].id,this.data[this.index].name);
            }
        })
    }
    
    attachTo(parent) {
      parent.appendChild(this.element)
    }
    
    setState(newData,isRoot) {
        this.data = newData;
        this.isRoot = isRoot;
        this.render();
    }
    
    render() {
        
        const prev = `
                    <div class="Node" >
                        <img data-prop='prev' src="./assets/prev.png">
                    </div>
                    `

        const Nodes = this.data
                        .map( (datas,index) => `
                        <div class="Node" >
                            <img  data-prop=${datas.type} data-index=${index}  
                                src="./assets/${datas.type.toLowerCase()}.png">
                            <div>${datas.name}</div>
                        </div>
                        `
                        ).join("");

        if(this.isRoot){
            this.element.innerHTML = Nodes;
        }else{
            this.element.innerHTML = prev + Nodes;
        }
    }
    }
