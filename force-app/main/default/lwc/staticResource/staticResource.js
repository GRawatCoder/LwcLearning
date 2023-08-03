import { LightningElement } from 'lwc';
import USER_PHOTO from '@salesforce/resourceUrl/user_image';
import USER_WALKING from '@salesforce/resourceUrl/user_walking';

export default class StaticResource extends LightningElement {
    user_photo = USER_PHOTO;
    user_walking = USER_WALKING;
}