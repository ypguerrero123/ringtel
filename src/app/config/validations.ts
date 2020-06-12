import {FormControl, FormGroup} from '@angular/forms';

export class Validations {

    /**
     * @method emailDomainValidator
     * @param control
     */
    public static emailDomainValidator(control: FormControl) {
        if (control.value) {
            let email = `${control.value}@nauta.com.cu`;
            if (!Validations.validateEmail(email)) {
                return {
                    emailDomain: {
                        parsedDomain: true
                    }
                };
            }
        }

    }

    /**
     * @method checkPasswords
     * @param group
     */
    public static checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let newPassword = group.get('newPassword').value;
        let confirmPass = group.get('confirmPassword').value;

        return newPassword === confirmPass ? null : {notEquals: true};
    }

    /**
     * @method validateEmail
     * @param email
     */
    private static validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
