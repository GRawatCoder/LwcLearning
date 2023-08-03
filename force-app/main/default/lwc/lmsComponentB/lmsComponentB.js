import { LightningElement,wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { APPLICATION_SCOPE, MessageContext,subscribe, unsubscribe } from 'lightning/messageService';


export default class LmsComponentB extends LightningElement {

    subscribeLms;
    messageRec;
    @wire(MessageContext) context;

    connectedCallback(){
        this.callSubscriber();
    }

    callSubscriber(){
        this.subscribeLms = subscribe(this.context,SAMPLEMC,(message)=>{
            this.handleMessage(message);
        },
        {
            scope:APPLICATION_SCOPE
        });
    }

    handleMessage(message){
        this.messageRec = message.lmsData.value? message.lmsData.value :'Empty Message published';
    }

    unSubscribeHandler(){
        unsubscribe(this.subscribeLms);
        this.subscribeLms = null;
    }
}