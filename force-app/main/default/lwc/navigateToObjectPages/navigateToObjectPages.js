import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils';

export default class NavigateToObjectPages extends NavigationMixin(LightningElement) {
    navigateToNewContactPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            }
        });
    }

    navigateToNewContactPageWithValues(){
        const defaultValues = encodeDefaultFieldValues({
            FirstName: 'Gaurav',
            LastName:'Rawat'
        });
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            },
            state:{
                defaultFieldValues:defaultValues
            }
        });
    }
}