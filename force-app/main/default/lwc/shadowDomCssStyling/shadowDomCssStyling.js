import { LightningElement } from 'lwc';

export default class ShadowDomCssStyling extends LightningElement {
    isLoaded = false;
    
    renderedCallback(){
        if(this.isLoaded) return;
        const STYLE = document.createElement("style");
        STYLE.innerText = `c-shadow-dom-css-styling .slds-button{
            background: red;
            color: white;
        }`; 
        this.template.querySelector("lightning-button").appendChild(STYLE);
        this.isLoaded = true;
    }
}