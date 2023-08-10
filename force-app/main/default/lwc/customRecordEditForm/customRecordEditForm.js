import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CustomRecordEditForm extends LightningElement {
    inputValue;
    objectName= ACCOUNT_OBJECT;
    handleChange(event){
        this.inputValue = event.target.value;
    }
    handleSuccess(event){
        const payload = event.detail; // return payload from server
        const updatedRecord = event.detail.id; // return Id from server
        console.log('onsuccess: ', updatedRecord);
        console.log(JSON.stringify(payload));
        const toastEvent = new ShowToastEvent({ 
            title:"Account created",
            message: "Record ID: "+ event.detail.id,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
    submitHandler(event){
        event.preventDefault();
        const inputCmp = this.template.querySelector('lightning-input');
        const value= inputCmp.value;
        if(!value.includes('india')){ 
            // set error 
            inputCmp.setCustomValidity("The account name must include 'india'");
        } else { 
            inputCmp.setCustomValidity("");
            const fields = event.detail.fields;
            fields.Name = value;
            // Programtically submit the form after performing the validations
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        }
        // show error on screen if any
        inputCmp.reportValidity();
    }
    errorHandler(event){
        const toastEvent = new ShowToastEvent({
            title:'Error on creating Account',
            message:event.detail.message,
            variant:'error'
        });
        this.dispatchEvent(toastEvent);
    }
}