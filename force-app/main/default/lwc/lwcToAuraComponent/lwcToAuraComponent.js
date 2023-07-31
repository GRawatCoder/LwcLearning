import { LightningElement,api } from 'lwc';

export default class LwcToAuraComponent extends LightningElement {
    @api title;

    clickHandler(){
        console.log("called click handler");
        const Event = new CustomEvent('lwcEvent', {
            detail:{
                        'msg': 'I am from LWC message'
                    }
            });
        this.dispatchEvent(Event);
    }
}