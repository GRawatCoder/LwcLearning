import { LightningElement } from 'lwc';
import LOCALE from '@salesforce/i18n/locale';
import CURRENCY from "@salesforce/i18n/currency";
import LANG from "@salesforce/i18n/lang";
import DIR from "@salesforce/i18n/dir";
import TIME_ZONE from '@salesforce/i18n/timeZone';

export default class Internationalization extends LightningElement {
    date = new Date(2020, 6, 7);
    lang = LANG;
    dir = DIR;
    formattedDate = new Intl.DateTimeFormat(LOCALE).format(this.date);
    localDate = new Date().toLocaleString('default', {timeZone: TIME_ZONE});

    number = 123456.78;
    formattedNumber = new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency: CURRENCY,
      currencyDisplay: "symbol",
    }).format(this.number);
}