import { LightningElement,wire,track } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import OPPORTUNITY_STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class GetPickListValues extends LightningElement {
    stageValue = '';
    oppStagesPickListData=[];
    @track error;

    @wire(getObjectInfo,{objectApiName:OPPORTUNITY_OBJECT})
    objectInfo;

    @wire(getPicklistValues,{recordTypeId:'$objectInfo.data.defaultRecordTypeId',
    fieldApiName:OPPORTUNITY_STAGE_FIELD}) 
    stagePickListValues({data,error}){
        if(data){
            this.oppStagesPickListData = [...this.setOpportunityComboboxData(data)];
        }
        if(error){
            this.error = "Unknown error";
            if (Array.isArray(error.body)) {
                this.error = error.body.map((e) => e.message).join(", ");
              } else if (typeof error.body.message === "string") {
                this.error = error.body.message;
              }                         
        }
    };

    setOpportunityComboboxData(stagePicklistValues){

        /*
            Another way to write this logic is-
            const newPickListValues = stagePicklistValues.values.map((item)=>{
                return {label:item.label, value:item.value};
            });
            return newPickListValues;
        */

        return stagePicklistValues.values.map(item=>({
                label:item.label,
                value:item.value
            })
        );
    }


    get options() {
        return this.oppStagesPickListData;
    }

    handleChange(event) {
        this.stageValue = event.detail.value;
    }
}