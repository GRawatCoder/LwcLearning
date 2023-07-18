import { LightningElement } from 'lwc';

export default class TemplateQuerySelector extends LightningElement {
    brands = ["mercedes", "bmw", "maruti", "tata"];
    fetchDetailHandler(){
        const elem = this.template.querySelector("h1");
        elem.style.border = '2px solid red';

        const elements = this.template.querySelectorAll('.name');
        Array.from(elements).forEach(item=>{
            item.setAttribute("title", item.innerText);
        });

        ///  lwc:dom="manual" demo
        const childElem = this.template.querySelector('.child')
        childElem.innerHTML = '<p>Hey i am a child element</p>'
    }
}