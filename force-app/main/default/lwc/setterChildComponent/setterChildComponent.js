import { LightningElement,api } from 'lwc';

export default class SetterChildComponent extends LightningElement {
    
    userDetail;
    
    @api
    get biodata(){
        return this.userDetail;
    }
    set biodata(data){
        let age = data.age*2;
        this.userDetail = {...data,'age':age, 'location':'Mumbai'};
    }
}