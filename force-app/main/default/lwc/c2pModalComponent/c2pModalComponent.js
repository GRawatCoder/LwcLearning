import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    closeHandler(){
        const event = new CustomEvent('close', {
            bubbles:true,
            detail:'Modal closed successfully!'
        });
        this.dispatchEvent(event);
    }
    footerHandler(){
        console.log('child event bubble');
    }
}