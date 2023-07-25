import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {
    constructor(){
        super();
        console.log("child constructor called");
    }
    connectedCallback(){
        console.log("child component connected callback");
    }
    renderedCallback(){
        console.log("child component rendered callback");
    }
}