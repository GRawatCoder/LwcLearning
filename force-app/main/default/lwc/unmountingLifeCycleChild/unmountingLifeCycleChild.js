import { LightningElement } from 'lwc';

export default class UnmountingLifeCycleChild extends LightningElement {
    constructor(){
        super();
        console.log("child constructor called");
    }
    connectedCallback(){
        console.log("child component connected callback");
        throw new Error("Error while loading Child component");
    }
    renderedCallback(){
        console.log("child component rendered callback");
    }
    disconnectedCallback(){
        alert("child is getting removed from DOM");
        console.log("child component disconnected callback");
    }
    /*errorCallback(error,stack){
        console.log('CHILD'+error.message);
        console.log('CHILD'+stack);
    }*/
}