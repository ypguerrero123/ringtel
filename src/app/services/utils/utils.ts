/**
 * Utils
 */
import {Method} from '../../model/stripe';

export class Utils {
    /**
     * @method parseMethods
     * @param resp
     */
    public static parseMethods(resp: Method[]) {
        let mthds: Method[] = resp;

        for (let i = 0; i < resp.length; i++) {
            for (let j = i + 1; j < mthds.length; j++) {
                if (resp[i].card.last4 == mthds[j].card.last4 && resp[i].card.brand == mthds[i].card.brand) {
                    mthds.splice(j, 1);
                }
            }
        }

        return mthds;
    }

    /**
     * @method getFormData
     * @param data
     * @param otherData
     */
    public static getFormData(data, otherData = null) {

        let formData = new FormData();

        Object.entries(data).forEach(([value, key]) => {
            formData.append(value, key.toString());
        });
        if (otherData) {
            Object.entries(otherData).forEach(([value, key]) => {
                formData.append(value, key.toString());
            });
        }


        return formData;
    }

    /**
     * @method formatDate
     * @param date
     */
    public static formatDate(date: Date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * @method strFixPhoneNumber
     * @param str
     */
    public static strFixPhoneNumber(str: string) {

        let emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

        let withoutEmojiCode = str.replace(emojiRegex, '');
        let strFinal = '';

        for (let i = 0; i < withoutEmojiCode.length; i++) {
            if (isFinite(Number(withoutEmojiCode.charAt(i))) && withoutEmojiCode.charAt(i) != ' ') {
                strFinal = `${strFinal}${withoutEmojiCode.charAt(i)}`;
            }
        }

        return strFinal;
    }
}
