import { LightningElement } from 'lwc';

export default class UnmountingLifeCycleParent extends LightningElement {
    isChildVisible = false;
    
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

    disconnectedCallback(){
        console.log("Parent component disconnected callback");
    }

    toggleChildHandler(){
        this.isChildVisible = !this.isChildVisible;
    }
}