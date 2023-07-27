import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    closeHandler(){
        const event = new CustomEvent('close', {
            detail:'Modal closed successfully!'
        });
        this.dispatchEvent(event);
    }
}