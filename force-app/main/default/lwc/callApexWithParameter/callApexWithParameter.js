import { LightningElement } from 'lwc';
import getAccountListByName from '@salesforce/apex/AccountController.getAccountListByName';
export default class CallApexWithParameter extends LightningElement {
    searchKey='';
    accountList;
    timer;
    searchHandler(event){
        window.clearTimeout(this.timer);
        console.log(event.target.value);
        this.searchKey = event.target.value;
        let timer = setTimeout(() => {
            this.getAccountFromServerByName(this.searchKey);
        }, 1000);        
    }

    getAccountFromServerByName(searchKey){
        console.log('search:'+searchKey);
        getAccountListByName({searchKey:searchKey})
            .then(result=>{
                console.log(result);
                this.accountList = result;
            }).catch(error=>{
                console.error(error);
            });
    }
}