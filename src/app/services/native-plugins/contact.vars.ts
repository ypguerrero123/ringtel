import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ContactInterface} from '../../model/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactVars {

    /**
     * @var Subject
     */
    public contactsName: Subject<ContactInterface[]> = new Subject<ContactInterface[]>();

}
