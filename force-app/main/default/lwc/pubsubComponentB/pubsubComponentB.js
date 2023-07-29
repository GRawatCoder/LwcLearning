import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class PubsubComponentB extends LightningElement {
    
    msg;
    connectedCallback(){
        this.callComponentA();
    }
    callComponentA(){
        pubsub.subscribe('ComponentA',(val)=>{
            this.msg = val;
        });
    }
}