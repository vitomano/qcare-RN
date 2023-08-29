import React, { Dispatch, SetStateAction } from 'react'
import { View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Contact } from '../interfaces/interfaces.auth'
import { globalStyles } from '../theme/globalStyles'
import { greenMain, mediumGrey } from '../theme/variables'
import { TextApp } from './ui/TextApp'

interface Props {
    suppliers: Contact[]
    setMailTo: Dispatch<SetStateAction<string[]>>
    mailTo: string[]
}

export const StepOne = ({ suppliers, setMailTo, mailTo }: Props) => {


    const changeMail = (contact: string) => {
        if (mailTo.includes(contact)) {
            const existMailTo = mailTo.filter(mail => mail !== contact)
            setMailTo(existMailTo)
        } else { setMailTo(c => [...c, contact]) }
    };


    return (
        <View >
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
        </View>
    )
}

