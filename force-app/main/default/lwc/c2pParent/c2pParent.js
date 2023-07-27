import { LightningElement } from 'lwc';

export default class C2pParent extends LightningElement {
    isModalShow = false;
    modalMsg;
    ShowModalHandler(){
        this.isModalShow = true;
    }

    modalHandler(event){
        this.modalMsg=event.detail;
        this.isModalShow = false;
    }
}