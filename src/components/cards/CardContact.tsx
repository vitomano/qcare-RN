import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextApp } from '../ui/TextApp';
import { mute } from '../../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { Contact } from '../../interfaces/interfaces.auth';
import qcareApi from '../../api/qcareApi';
import { AuthContext } from '../../context/AuthContext';
import { ModalBlock } from '../modals/ModalBlock';
import { EditContact } from '../EditContact';

interface Props {
    contact: Contact,
}

export const CardContact = ({ contact }: Props) => {

    const { refresh } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [confirmation, setConfirmation] = useState(false)
    const [editContact, setEditContact] = useState(false)

    const handleRemove = async (id: string) => {
        setLoading(true)
        try {
            await qcareApi.post('/auth/remove-contact', { contactId: id })
        } catch (error) {
            console.log(error)
        } finally {
            refresh()
            setLoading(false)
            setConfirmation(false)
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => setEditContact(true)}
            style={{ paddingVertical: 15, borderBottomWidth: .5, borderBottomColor: mute }}
        >
            <View style={{ flexDirection: 'row', position: "relative" }}>

                <View style={{ width: 60 }}>
                    <TextApp bold style={{ fontSize: 18 }}>{contact.ref}</TextApp>
                </View>

                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <TextApp>{contact.supplier}</TextApp>
                    <TextApp>{contact.contactName}</TextApp>
                    <TextApp color='blue'>{contact.email}</TextApp>
                </View>

                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => setConfirmation(true)}
                    style={{ paddingLeft: 5, alignSelf: "flex-start" }}
                >
                    <Icon size={19} name="trash-outline" />
                </TouchableOpacity>

                <ModalConfirmation
                    openModal={setConfirmation}
                    modal={confirmation}
                    action={() => handleRemove(contact.id)}
                    message={`Are you sure you want to remove ${contact.email}?`}
                    loading={loading}
                />


                <ModalBlock
                    modal={editContact}
                    openModal={setEditContact}
                    style={{ padding: 20 }}
                >
                    <EditContact
                        contact={contact}
                        setEditContact={setEditContact}
                    />
                </ModalBlock>


            </View>
        </TouchableOpacity>
    )
}
