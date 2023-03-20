import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Contact } from '../interfaces/interfaces.auth';
import { text } from '../theme/variables';
import { CardContact } from './cards/CardContact';

import Icon from 'react-native-vector-icons/Ionicons';
import { TextApp } from './ui/TextApp';
import { globalStyles } from '../theme/globalStyles';

interface Props {
    contacts: Contact[]
}

export const ContactList = ({ contacts }: Props) => {

    const [page, setPage] = useState(0)
    const [newContacts, setNewContacts] = useState<Contact[][]>([])

    useEffect(() => {

        const pageSize = 30

        const res: Contact[][] = [];
        for (let i = 0; i < contacts.length; i += pageSize) {
            const chunk = contacts.slice(i, i + pageSize);
            res.push(chunk);
        }
        setNewContacts(res)

    }, [contacts])

    const changePage = (item: "prev" | "next") => {

        if (item === "prev" && page > 0) {
            setPage(page - 1)
        } else if (item === "next" && page + 1 < newContacts.length) {
            setPage(page + 1)
        }
    };

    return (
        <View>
            {
                newContacts.length !== 0 &&

                newContacts[page].map(contact => (
                    <CardContact
                        key={contact.id}
                        contact={contact}
                    />
                ))
            }


            {

                newContacts.length > 1 &&

                <View style={{ ...globalStyles.flexRow, marginTop: 30, alignSelf: "center" }}>
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => changePage("prev")}
                    >
                        <Icon name='chevron-back-outline' size={25} color={text} />
                    </TouchableOpacity>

                    <TextApp bold style={{ marginHorizontal: 20 }}>{page + 1} / {newContacts.length}</TextApp>

                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => changePage("next")}
                    >
                        <Icon name='chevron-forward-outline' size={25} color={text} />
                    </TouchableOpacity>
                </View>
            }



        </View>
    )
}
