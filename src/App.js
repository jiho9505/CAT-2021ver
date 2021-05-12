import Header from './components/header/header.js'
import Body from './components/body/body.js'
import Dialog from './components/dialog/dialog.js'
import { api } from './api/api.js'
import Loading from './components/common/Loading.js'


console.log("app is running!");

const cache = {};

export default class App {
  $target = null;
  keyword = ['root'];
  data = [];
  nodeNum = [];

  constructor($target) {
    this.$target = $target;

    this.header = new Header({
        onClick: async (idx) => {
            idx = parseInt(idx);
            if(idx === 0){
                this.keyword = ['root'];
                this.nodeNum = [];
                
                const data = cache['root'];
                this.setState(data.data,this.keyword,data.isRoot)
            }else if(idx < this.nodeNum.length){
                this.keyword = this.keyword.slice(0,idx+1);
                this.nodeNum = this.nodeNum.slice(0,idx);
                const nodeId = this.nodeNum[this.nodeNum.length-1]

                const data = cache[nodeId];
                this.setState(data.data,this.keyword,data.isRoot)
            }
        }
    });
    this.header.attachTo($target)

    this.body = new Body({ 
        onClickDir: async (nodeId,name) => {
            this.loading.open();
            if(cache[nodeId]){
                const data = cache[nodeId];
                
                this.nodeNum.push(nodeId);
                this.keyword.push(name);
                this.setState(data.data,this.keyword,data.isRoot)
                
                this.loading.close();
            }else{
                const data = await api.specific(nodeId)
                if(data.success){
                    this.nodeNum.push(nodeId);
                    this.keyword.push(name);
                    cache[nodeId] = {
                        success: true,
                        data: data.data,
                        isRoot: false
                    }
                    this.setState(data.data,this.keyword,data.isRoot)
                }
                else{
                    alert(data.message)
                }
                this.loading.close();
            }
            
       },
       onClickFile: (path) => {
        
            this.dialog.setState({ 
                data: {
                    image: path
                }
            });
      },
      onClickPrev: async () => {
        let data;
        if(this.nodeNum.length === 1){
            data = cache['root'];
        }else{
            data = cache[this.nodeNum[this.nodeNum.length-2]];
        }
        
        this.keyword.pop();
        this.nodeNum.pop();
        this.setState(data.data,this.keyword,data.isRoot)
      }
    });

    this.body.attachTo($target);

    this.loading = new Loading();
    this.loading.attachTo(document.querySelector('body'));

    this.dialog = new Dialog();
    this.dialog.attachTo(document.querySelector('body'));
    
    const datas = async () => {
        this.loading.open();
        const data = await api.root();
        if(data.success){
            cache['root'] = {
                success: true,
                data: data.data,
                isRoot: true
            }
            this.setState(data.data,this.keyword,data.isRoot);
        }else{
            alert(data.message)
        }
        this.loading.close();
    }
    datas(); 
  }

  setState(nextData,keyword,isRoot) {
    this.data = nextData;
    this.header.setState(keyword);
    this.body.setState(nextData,isRoot);
  }

}
