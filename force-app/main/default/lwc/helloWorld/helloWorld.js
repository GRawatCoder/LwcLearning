import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    title="text should display here";
    address={
        name:'Noida',
        pincode:110049
    };

    keyChangeHandler(event){
        this.title = event.target.value;
        this.address = {...this.address,"pincode":event.target.value};
    }

    names = ["John", "Nick", "Dave"];
    x = 10;
    y = 20;

    get getFirstName(){
        return this.names[0];
    }

    get getSum(){
        return this.x + this.y;
    }

}