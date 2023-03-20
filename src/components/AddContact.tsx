import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Toast from 'react-native-toast-message';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'
import { inputStyles } from '../theme/inputStyles';
import ButtonStyled from './ui/ButtonStyled'

import { useEmail } from '../hooks/useEmail';
import { danger } from '../theme/variables';
import qcareApi from '../api/qcareApi';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../pages/LoadingScreen';


interface Props {
    setAddContact: (b: boolean) => void
}

export const AddContact = ({ setAddContact }: Props) => {

    const { user, refresh } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)

    const [supplier, setSupplier] = useState<string>("")
    const [ref, setRef] = useState<string>("")
    const [contactName, setContactName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [errorMsg, seterrorMsg] = useState({
        error: false,
        msg: "este error"
    })

    const { ok, msg } = useEmail(email)

    const save = async () => {
        const otherEmails = user?.contacts?.map(e => e.email)
        
        if(otherEmails?.includes(email)) return seterrorMsg({ error: true, msg: "This email already exist" })

        if (!ok) return seterrorMsg({ error: true, msg })

        if (supplier.length === 0 || contactName.length === 0 || ref.length === 0)
            return  seterrorMsg({ error: true, msg: "All fields must be complete" })
            
        if( ref.length > 3 )
        return  seterrorMsg({ error: true, msg: "Reference must be 3 characters max." })
        
        setLoading(true)

        try {
            await qcareApi.post('/auth/add-contact', { id: uuidv4(), supplier, ref: ref.toUpperCase(), contactName, email })
            
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Contact added successfully',
              });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong',
              });
            console.log(error)
        } finally {
            setLoading(false)

            refresh()
            setAddContact(false)
        }
    };

    if(loading) return <LoadingScreen text='Adding Contact...'/>


    return (
        <>
            <TextApp size='l' bold style={{ marginBottom: 20 }}>Edit Contact</TextApp>

            <View style={{ marginBottom: 15 }}>
                <TextApp bold style={{ marginBottom: 5 }}>Supplier</TextApp>

                <TextInput
                    keyboardType='default'
                    autoCapitalize="none"
                    value={supplier}
                    autoCorrect={false}
                    style={{ ...inputStyles.input, flex: 1 }}
                    onChangeText={(e) => setSupplier(e as string)}
                />
            </View>

            <View style={{ marginBottom: 15 }}>
                <View style={{flexDirection:"row", marginBottom: 5, alignItems:"baseline"}}>
                <TextApp bold >Reference </TextApp>
                <TextApp size='xs' style={{ marginBottom: 5 }}>(3 characters max.)</TextApp>
                </View>

                <TextInput
                    keyboardType='default'
                    autoCapitalize="none"
                    value={ref}
                    autoCorrect={false}
                    style={{ ...inputStyles.input, flex: 1 }}
                    onChangeText={(e) => setRef(e as string)}
                />
            </View>

            <View style={{ marginBottom: 15 }}>
                <TextApp bold style={{ marginBottom: 5 }}>Contact Name</TextApp>

                <TextInput
                    keyboardType='default'
                    autoCapitalize="none"
                    value={contactName}
                    autoCorrect={false}
                    style={{ ...inputStyles.input, flex: 1 }}
                    onChangeText={(e) => setContactName(e as string)}
                />
            </View>

            <View>
                <TextApp bold style={{ marginBottom: 5 }}>Email</TextApp>

                <TextInput
                    keyboardType='email-address'
                    autoCapitalize="none"
                    value={email}
                    autoCorrect={false}
                    style={{ ...inputStyles.input, flex: 1 }}
                    onChangeText={(e) => setEmail(e as string)}
                />
            </View>

            {
                errorMsg.error &&
                <View style={styles.error}>
                    <TextApp size='s' color='danger'>{errorMsg.msg}</TextApp>
                </View>
            }


            <View style={{ ...globalStyles.flexBetween, marginTop: 30 }}>
                <ButtonStyled
                    onPress={() => setAddContact(false)}
                    text='Cancel'
                    outline
                    blue
                    width={48}
                />
                <ButtonStyled
                    onPress={save}
                    text='Save'
                    blue
                    width={48}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    error:{ 
        flex: 1,
        backgroundColor: "#f8d7da",
        marginTop:10,
        borderRadius: 10,
        padding: 8,
        borderColor: danger,
        borderWidth: .5
    }
});