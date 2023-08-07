import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class NavigationToHome extends NavigationMixin(LightningElement) {
    navigateToHome(){
        this[NavigateMixin.Navigate]({
            type:'standard_namedPage',
            attributes:{
                pageName:'home'
            }
        });
    }
}