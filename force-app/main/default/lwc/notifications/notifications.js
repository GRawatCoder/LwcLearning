import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Notifications extends LightningElement {
    @api motoLabel;
    _title='write your title here...'
    message = 'your message here';
    variant = 'error';
    variantOptions=[
        { label: 'error', value: 'error' },
        { label: 'warning', value: 'warning' },
        { label: 'success', value: 'success' },
        { label: 'info', value: 'info' }
    ];

    titleChange(event){
        this._title = event.target.value;
    }
    messageChange(event){
        this.message = event.target.value;
    }
    variantChange(event) {
        this.variant = event.target.value;
    }
    showNotification(){
        const evt = new ShowToastEvent({
            title:this._title,
            message:this.message,
            variant:this.variant,
            mode:'sticky'
        });
        this.dispatchEvent(evt);
    }
}