import {options} from "../../config/index";

export function checkValidStrId(str:string):boolean {
    for(let i=0; i<str.length; i++) {
        if (options.alphabet.indexOf(str[i]) == -1) {
            return false;
        }
    }

    return true;
}