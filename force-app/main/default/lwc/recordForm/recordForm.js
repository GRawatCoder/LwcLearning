import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class RecordForm extends LightningElement {
    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD, WEBSITE_FIELD];
    handleAccountCreated(event){
        const recordId = event.detail.id;
        const toastEvt = new ShowToastEvent({
            title:'Account Created',
            message:`Record created with Id:${recordId}`,
            variant:'success'
        });
        this.dispatchEvent(toastEvt);
    }
}