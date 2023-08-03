import { LightningElement } from 'lwc';
import MOMENT from '@salesforce/resourceUrl/moment';
import ANIMATE from '@salesforce/resourceUrl/animate';
import {loadScript, loadStyle} from 'lightning/platformResourceLoader';

export default class ThirdPartyLibrary extends LightningElement {
    currentDate='';
    isLibLoaded = false;
    renderedCallback(){
        if(this.isLibLoaded) return;
        Promise.all([
            loadStyle(this,ANIMATE+'/animate/animate.min.css'),
            loadScript(this,MOMENT+'/moment/moment.min.js')            
        ]).then(()=>{
            this.setDateOnWeb();
        }).catch(err=>{
            console.error(err);
        });
    }

    setDateOnWeb(){
        this.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    }
}