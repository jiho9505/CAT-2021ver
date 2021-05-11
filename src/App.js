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
                this.loading.open();
                this.keyword = ['root'];
                this.nodeNum = [];
                
                // const data = await api.root();
                const data = cache['root'];
                
                if(data.success){
                    this.setState(data.data,this.keyword)
                }
                else{
                    alert(data.message)
                }
                this.loading.close();

            }else if(idx < this.nodeNum.length){
                this.loading.open();
                this.keyword = this.keyword.slice(0,idx+1);
                this.nodeNum = this.nodeNum.slice(0,idx);
                const nodeId = this.nodeNum[this.nodeNum.length-1]

                let data = {};
                if(cache[nodeId]){
                    data = cache[nodeId]
                }else{
                    data = await api.specific(nodeId);
                }
        
                if(data.success){
                    if(!cache[nodeId]){
                        cache[nodeId] = {
                            success: true,
                            data: data.data
                        }
                    }
                    
                    this.setState(data.data,this.keyword)
                }
                else{
                    alert(data.message)
                }
                this.loading.close();
            }
        }
    });
    this.header.attachTo($target)

    this.body = new Body({ 
        onClickDir: async (nodeId,name) => {
            this.loading.open();
            if(cache[nodeId]){
                const data = cache[nodeId];
                if(data.success){ // if문 필요 없을 듯..
                    this.nodeNum.push(nodeId);
                    this.keyword.push(name);
                    this.setState(data.data,this.keyword)
                }
                this.loading.close();
            }else{
                const data = await api.specific(nodeId)
                if(data.success){
                    this.nodeNum.push(nodeId);
                    this.keyword.push(name);
                    cache[nodeId] = {
                        success: true,
                        data: data.data
                    }
                    this.setState(data.data,this.keyword)
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
                    visible: true,
                    image: path
                }
            });
      },
      onClickPrev: async () => {
        let data;
        this.loading.open();
        if(this.nodeNum.length === 1){
            // data = await api.root();
            data = cache['root'];
        }else{
            if(cache[this.nodeNum[this.nodeNum.length-2]]){
                data = cache[this.nodeNum[this.nodeNum.length-2]];
            }else{
                data = await api.specific(this.nodeNum[this.nodeNum.length-2]);
                data.success ? cache[this.nodeNum[this.nodeNum.length-2]] = {
                    success: true,
                    data: data.data
                } : ''
            }
            
        }
        
        if(data.success){
            this.keyword.pop();
            this.nodeNum.pop();
            this.setState(data.data,this.keyword)
        }
        else{
            alert(data.message)
        }
        this.loading.close();
      }
    });

    this.body.attachTo($target);

    this.loading = new Loading();
    this.loading.attachTo(document.querySelector('body'));

    this.dialog = new Dialog({ 
        data: {
            visible: false,
            image: null
        }
      });
    this.dialog.attachTo(document.querySelector('body'));
    
    const datas = async () => {
        this.loading.open();
        const data = await api.root();
        if(data.success){
            cache['root'] = {
                success: true,
                data: data.data
            }
            this.setState(data.data,this.keyword);
        }
        else{
        alert(data.message)
        }
        this.loading.close();
    }
    datas(); 
  }

  setState(nextData,keyword) {
    this.data = nextData;
    this.header.setState(keyword);
    this.body.setState(nextData);
  }

}