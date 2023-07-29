import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class PubsubComponentA extends LightningElement {

    message='';
    handleClick(){
        pubsub.publish('ComponentA',this.message);
    }
    inputHandler(event){
        this.message = event.target.value;
    }
}