import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Contact } from '../interfaces/interfaces.auth'
import { globalStyles } from '../theme/globalStyles'
import { greenMain, mediumGrey } from '../theme/variables'
import { TextApp } from './ui/TextApp'
import { AuthContext } from '../context/AuthContext'
import { ListType, PickerModal } from './modals/PickerModal'
import { sortContact } from '../helpers/sortContacts'

interface Props {
    contactsTeam: Contact[]
    suppliers: Contact[]
    setMailTo: Dispatch<SetStateAction<string[]>>
    mailTo: string[]
    // isLoading: boolean
}

export const StepOne = ({ contactsTeam, suppliers, setMailTo, mailTo }: Props) => {

    const { user } = useContext(AuthContext)

    const [modalContact, setModalContact] = useState<boolean>(false)
    const [CONTACTS, setCONTACTS] = useState<ListType[]>([{ label: 'Select Contact', value: 'No Contact' }])

    useEffect(() => {
        setCONTACTS([{ label: 'Select Contact', value: 'No Contact' }, ...sortContact(user?.contacts ?? []).map(contact => ({ label: `${contact.supplier} (${contact.email})`, value: contact.email }))])
    }, [contactsTeam])


    const changeMail = (contact: string) => {
        if (mailTo.includes(contact)) {
            const existMailTo = mailTo.filter(mail => mail !== contact)
            setMailTo(existMailTo)
        } else { setMailTo(c => [...c, contact]) }
    };

    const addContact = (val: string) => {
        if (mailTo.find(mail => mail === val)) return
        setMailTo([...mailTo, val]);
    };

    return (
        <View >
            <TextApp size='m' bold style={{ marginBottom: 25 }}>Add from contacts</TextApp>

            <View style={{ marginBottom: 25 }}>
                <PickerModal
                    modal={modalContact}
                    openModal={setModalContact}
                    LIST={CONTACTS}
                    state='No Contact'
                    setState={addContact}
                    outline
                />
            </View>

            {
                suppliers.map(contact => (
                    <View key={contact.id} style={{
                        ...globalStyles.flexRow,
                        paddingBottom: 10, marginBottom: 10,
                        borderBottomWidth: .5, borderBottomColor: mediumGrey
                    }}>
                        <BouncyCheckbox
                            isChecked={mailTo.includes(contact.email)}
                            size={20}
                            fillColor={greenMain}
                            unfillColor="#FFFFFF"
                            iconStyle={{ marginRight: -8 }}
                            onPress={() => changeMail(contact.email)}
                        />
                        <View style={{ flex: 1 }}>
                            <TextApp bold>{contact.contactName}</TextApp>
                            <TextApp>{contact.email}</TextApp>
                        </View>
                    </View>
                ))
            }

            {
                mailTo.filter(mail => !suppliers.map(supplier => supplier.email).includes(mail)).length > 0 &&
                <View style={{marginTop: 20}}>
                    <TextApp size='xs' style={{marginBottom: 15}}>Other contacts</TextApp>
                    {mailTo.filter(mail => !suppliers.map(supplier => supplier.email).includes(mail))
                        .map(contact => (
                            <View key={contact} style={{
                                ...globalStyles.flexRow,
                                paddingBottom: 10, marginBottom: 10,
                                borderBottomWidth: .5, borderBottomColor: mediumGrey
                            }}>
                                <BouncyCheckbox
                                    isChecked={mailTo.includes(contact)}
                                    size={20}
                                    fillColor={greenMain}
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ marginRight: -8 }}
                                    onPress={() => changeMail(contact)}
                                />
                                <View style={{ flex: 1 }}>
                                    <TextApp>{contact}</TextApp>
                                </View>
                            </View>
                        ))}
                </View>
            }

        </View>
    )
}

