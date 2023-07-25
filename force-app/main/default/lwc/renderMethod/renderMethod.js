import { LightningElement } from 'lwc';
import signupTemplate from './signupTemplate.html';
import signinTemplate from './signinTemplate.html';
import defaultTemplate from './renderMethod.html'

export default class RenderMethod extends LightningElement {
    buttonClickedLbl = '';
    render(){
        console.log('RENDER: '+this.buttonClickedLbl);
        return this.buttonClickedLbl=='Signup'? signupTemplate :
        this.buttonClickedLbl=='Signin'? signinTemplate:
        defaultTemplate;
    }

    handleClick(event){ 
        this.buttonClickedLbl = event.target.label;
    }

    submitHandler(event){ 
        console.log(`${event.target.label} Successfully!!`);
    }

}