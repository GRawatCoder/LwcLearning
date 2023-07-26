import { LightningElement,api } from 'lwc';

export default class P2cAlertComponent extends LightningElement {
    @api title;
    @api message;
    @api pi;
    @api isLoad;

}