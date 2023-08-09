import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class RecordViewForm extends LightningElement {
    accountObject = ACCOUNT_OBJECT;
}