import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecordAdapter extends LightningElement {
    
    accountName;
    accountId;
    handleInputChange(event){
        this.accountName = event.target.value;
        this.accountId=undefined;
    }
    handleClick(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        const recordInput = {apiName:ACCOUNT_OBJECT.objectApiName,fields};
        createRecord(recordInput)
            .then((data)=>{
                this.accountId = data.id;
                console.log(data);
                this.dispatchEvent(new ShowToastEvent({
                    title:"Success",
                    message:"Account is created",
                    variant:"success"
                }));
            }).catch((error)=>{
                console.error(error);
                this.dispatchEvent(new ShowToastEvent({
                    title:"Error creating record",
                    message:error.body.message,
                    variant:"error"
                }));
            });
    }
}