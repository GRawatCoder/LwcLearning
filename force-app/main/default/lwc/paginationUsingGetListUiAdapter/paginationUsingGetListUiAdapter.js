import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import NAME_FIELD from "@salesforce/schema/Contact.Name";


export default class PaginationUsingGetListUiAdapter extends LightningElement {
    records;
    error;
    pageToken=null;
    nextPageToken=null;
    previousPageToken=null;

    @wire(getListUi,
        {
            objectApiName:CONTACT_OBJECT,
            listViewApiName:"AllContacts",
            sortBy:NAME_FIELD,
            pageSize:10,
            pageToken:'$pageToken'
        })
        listViewHandler({data, error}){
            if(data){
                console.log(data);
                this.records = data.records.records;
                this.error=undefined;
                this.nextPageToken = data.records.nextPageToken;
                this.previousPageToken = data.records.previousPageToken;
            }
            if(error){
                console.error(error);
                this.error = error;
                this.records = undefined;
            }            
        }

        handlePreviousPage(){
            this.pageToken = this.previousPageToken;
        }
        handleNextPage(){
            this.pageToken = this.nextPageToken;
        }
}