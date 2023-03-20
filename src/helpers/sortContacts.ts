import { Contact } from "../interfaces/interfaces.auth";

export const sortContact = (contacts:Contact[]):Contact[] => {

    function compare(a:any, b:any) {
        if (a.ref < b.ref) {
            return -1;
        }
        if (a.ref > b.ref) {
            return 1;
        }
        return 0;
    }

    return contacts.sort(compare);
};


