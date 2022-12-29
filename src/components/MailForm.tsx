import React, { useState } from 'react'
import { Platform, StyleSheet, TextInput, View, Keyboard, TouchableOpacity } from 'react-native'
import { useEmail } from '../hooks/useEmail'
import { globalStyles } from '../theme/globalStyles'
import { bgColor, blue } from '../theme/variables'
import ButtonStyled from './ui/ButtonStyled'
import { TextApp } from './ui/TextApp'
import Toast from 'react-native-toast-message'
import { alertMsg } from '../helpers/alertMsg'
import { useSendEmail } from '../api/useReport'
import { Tags } from './ui/Tags'
import Icon from 'react-native-vector-icons/Ionicons';



interface Props {
    mailTo: string[]
    cc: string[]
    link: string
    message: string
    closeModal: (b: boolean) => void

}

export const MailForm = ({ mailTo, cc, link, message, closeModal }: Props) => {

    const { mutate, isLoading } = useSendEmail()

    const [mails, setMails] = useState<string[]>(mailTo)
    const [ccs, setCcs] = useState<string[]>(cc)
    const [messages, setMessages] = useState<string>(message)

    const [currentMail, setCurrentMail] = useState("")
    const [currentCC, setCurrentCC] = useState("")
    const [currentSubject, setCurrentSubject] = useState("")

    const sendEmail = () => {
        if (mails.length === 0)  return alertMsg("Error", 'There are not contacts to send') 
        if (currentSubject.length < 1)  return alertMsg("Error", 'Add a Subject') 
        if (messages.length < 1)  return alertMsg("Error", 'Add a Message') 

        mutate({
            mailTo: mails,
            cc: ccs,
            subject: currentSubject,
            message: messages,
            link: link
        },{
            onSuccess: () => {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'The email has been sent'
                  })
                closeModal(false)
            }
        })
    };

    const { msg, ok } = useEmail(currentMail)
    const { msg:msgCC, ok:okCC } = useEmail(currentCC)

    const addEmail = (type:"mailto" | "cc") => {

        if (type === "mailto" && !ok) return alertMsg("Incorrect email", msg)
        if (type === "cc" && !okCC) return alertMsg("Incorrect email", msgCC)

        if(
            mails.includes(currentMail) || 
            mails.includes(currentCC) ||
            ccs.includes(currentMail) ||
            ccs.includes(currentCC)
            ) return alertMsg("Exist", "The email already exist")

        if(type === "mailto" ){
            setMails([...mails, currentMail])
            setCurrentMail("")
        }
        if(type === "cc" ){
            setCcs([...mails, currentMail])
            setCurrentCC("")
        }
            
        Keyboard.dismiss()
    };


    return (
        <View>
            <View>

                <TextApp style={styles.label}>Mail to:</TextApp>
                <View style={{ ...styles.inputArray, ...globalStyles.flexBetween }} >

                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={currentMail as string}
                        onChangeText={(e) => setCurrentMail(e)}
                        onSubmitEditing={() => addEmail("mailto")}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => addEmail("mailto")}
                    >
                        <Icon name="add-circle" size={30} color={blue} />
                    </TouchableOpacity>
                </View>
                {
                    mails.length > 0 &&
                    <View style={{ marginTop: 5 }}>
                        <Tags
                            tags={mails}
                            setTags={setMails}
                        />
                    </View>
                }
                <View style={{ marginBottom: 15 }} />


                <TextApp style={styles.label}>CC:</TextApp>
                <View style={{ ...styles.inputArray, ...globalStyles.flexBetween }} >
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={currentCC as string}
                        onChangeText={(e) => setCurrentCC(e)}
                        onSubmitEditing={() => addEmail("cc")}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => addEmail("cc")}
                    >
                        <Icon name="add-circle" size={30} color={blue} />
                    </TouchableOpacity>
                </View>
                {
                    ccs.length > 0 &&
                    <View style={{ marginTop: 5 }}>
                        <Tags
                            tags={ccs}
                            setTags={setCcs}
                        />
                    </View>
                }
                <View style={{ marginBottom: 15 }} />


                <TextApp style={styles.label}>Subject:</TextApp>
                <TextInput
                    keyboardType='default'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={currentSubject as string}
                    style={styles.input}
                    onChangeText={(e) => setCurrentSubject(e)}
                />
                <View style={{ marginBottom: 15 }} />


                <TextApp style={styles.label}>Message:</TextApp>
                <TextInput
                    style={{ ...styles.input, height: 120, marginBottom: 30 }}
                    multiline={true}
                    value={messages}
                    onChangeText={(e) => setMessages(e)}
                />

            </View>

            <View style={{ ...globalStyles.flexBetween, marginBottom: 10, marginTop: 10 }}>
                <ButtonStyled
                    onPress={() => closeModal(false)}
                    text='Close'
                    outline
                    blue
                    width={48}
                />
                <ButtonStyled
                    onPress={sendEmail}
                    text='Send'
                    blue
                    width={48}
                    icon="mail-outline"
                    loading={isLoading}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    label: {
        marginBottom: 5
    },
    input: {
        fontSize: 15,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: blue,
        borderWidth: 1,
        backgroundColor: "transparent",
        paddingVertical: Platform.OS === 'android' ? 5 : 11,
    },
    inputArray: {
        fontSize: 15,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: blue,
        borderWidth: 1,
        backgroundColor: "transparent",
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    }
});