import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
    brandList = ["Maruti", "Mercedes", "Tata", "Hyundai"];

    ceoList = [
        {
            id:1,
            company:"Google",
            name:"Sundar Pichai"
        },
        {
            id:2,
            company: "Apple",
            name:"Tim cook"
        },
        {
            id: 3,
            company: "Adani Enterprises",
            name :"Adani"
        },
        {
            id:4,
            company:"Reliance",
            name:"Mukesh Ambani"
        }
    ]
}