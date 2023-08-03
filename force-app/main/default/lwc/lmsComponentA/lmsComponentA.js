import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { MessageContext,publish } from 'lightning/messageService';

export default class LmsComponentA extends LightningElement {

    inputVal;
    @wire(MessageContext) context;
    
    inputHandler(event){
        this.inputVal = event.target.value;
    }

    publishHandler(){
        const message = {
            lmsData :{
                value:this.inputVal
            }
        };
        publish(this.context,SAMPLEMC,message);
    }
}