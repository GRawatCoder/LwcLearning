import { LightningElement,api } from 'lwc';

export default class P2cSliderComponent extends LightningElement {
    sliderVal=20;

    @api resetSlider(){
        this.sliderVal = 50;
    }

    changeHandler(event){ 
        this.sliderVal = event.target.value;
    }

}