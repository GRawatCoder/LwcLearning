import { LightningElement } from 'lwc';

export default class DynamicCss extends LightningElement {
    percentage=10;
    calcPercentage(event){
        this.percentage = event.target.value;
    }
    get calWidth(){
        return `width:${this.percentage}%`;
    }
}