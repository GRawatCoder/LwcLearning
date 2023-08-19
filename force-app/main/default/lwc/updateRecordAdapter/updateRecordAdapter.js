import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
const COLUMNS =[
    {label:'Id', fieldName:'Id'},
    {label:'Name', fieldName:'Name'},
    {label:'Title', fieldName:'Title'},
    {label:'Phone', fieldName:'Phone', editable:true},
    {label:'Email', fieldName:'Email', type:'email', editable:true}
];

export default class UpdateRecordAdapter extends LightningElement {
    data=[];
    rowOffset = 0;
    columns = COLUMNS;
    draftValues=[];
    @wire(getListUi,{objectApiName:CONTACT_OBJECT,listViewApiName:'AllContacts'})
    listViewHandler({data,error}){
        if(data){
            console.log(data);
            this.data = data.records.records.map(item=>{
                return {
                    Id:item.fields['Id'].value,
                    Name:item.fields['Name'].value,
                    Title:item.fields['Title'].value,
                    Phone:item.fields['Phone'].value,
                    Email:item.fields['Email'].value
                };
            });
            console.log('----data loaded object----');
            console.log(this.data);
        }
        if(error){
            console.error(error);
        }
    };
    updateContactHandler(event){
        console.log(JSON.stringify(event.detail.draftValues));
        const recordInputs = event.detail.draftValues.map(draft=>{
            const fields = {...draft};
            return {fields:fields};
        });
        console.log(recordInputs);
        const promises = recordInputs.map(recordInput=>updateRecord(recordInput));
        Promise.all(promises).then(()=>{
            console.log('Contact updated Successfully');
            this.draftValues=[];
        }).catch(error=>{
            console.error("Error updating the record", error)
        });

    }
}