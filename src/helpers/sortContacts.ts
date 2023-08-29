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


export const combinedContacts = (contacts:Contact[], teamsContact:Contact[]) => {
    const contactEmails = contacts.map((contact) => contact.email);
    const filteredTeamsContact = teamsContact.filter(
        (teamContact) => !contactEmails.includes(teamContact.email)
    );
    return contacts.concat(filteredTeamsContact);
};


export const filterContactsByEmail = (contacts:Contact[], teamsContact:Contact[]) => {
    const contactEmails = contacts.map((contact) => contact.email);
    return teamsContact.filter((teamContact) => !contactEmails.includes(teamContact.email));
  };

