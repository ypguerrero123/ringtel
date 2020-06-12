import {Ccodes} from "../../model/ccodes";
import * as ccodes from "../../config/ccodes.json";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProfileVars {

    /**
     * @var array
     */
    public ccodes: Ccodes[] = (ccodes as any).default;
    /**
     * @var string
     */
    public ccodePhoneValue: string = '+53';

    /**
     * @method updateCCodePhoneValue
     * @param ccodePhoneValue
     */
    public updateCCodePhoneValue(ccodePhoneValue: string) {
        this.ccodePhoneValue = ccodePhoneValue;
    }

    /**
     * @method getColumnOptions
     * @param phoneCodeNumber
     */
    public getColumnOptions(phoneCodeNumber: string) {
        let options = [];
        this.ccodes.forEach((ccodes: Ccodes) => {
            options.push({
                text: `${ccodes.name} (+${ccodes.phone_code})`,
                value: `+${ccodes.phone_code}`,
                selected: phoneCodeNumber == `+${ccodes.phone_code}`
            });
        });
        return options;
    }
}
