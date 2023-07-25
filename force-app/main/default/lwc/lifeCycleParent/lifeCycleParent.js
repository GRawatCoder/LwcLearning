import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {

    name='';
    constructor(){
        super();
        console.log("parent constructor called");
    }
    connectedCallback(){
        console.log("Parent component connected callback");
    }
    renderedCallback(){
        console.log("Parent component rendered callback");
    }
    onKeyUpHandler(event){
        this.name=event.target.value;
    }    
}