import { LightningElement,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
const myfields = [NAME_FIELD, EMAIL_FIELD]
export default class WireServiceComponent extends LightningElement {    
    userDetail;
    
    @wire(getRecord,{recordId:Id,fields:myfields})
    userDetailsHandler({data,error}){
        if(data){
            this.userDetail=data.fields;
        }
        if(error){
            console.log(error);
        }
    };
    @wire(getRecord, {recordId:Id, fields:myfields})
    userDetailProperty;

}