import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class NavigateToLwcPage extends NavigationMixin(LightningElement) {
    navigateToLwc(){
        const componentDef = {
            componentDef:'c:Notifications',
            attributes:{
                motoLabel:'Hello, Moto!'
            }
        };
        const encodedCompDef = btoa(JSON.stringify(componentDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedCompDef
            }
        });
    }
}