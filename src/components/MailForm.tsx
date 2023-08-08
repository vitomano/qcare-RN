import React, { useContext, useEffect, useState } from 'react'
import { Platform, StyleSheet, TextInput, View, Keyboard, TouchableOpacity, Image } from 'react-native'
import { useEmail } from '../hooks/useEmail'
import { globalStyles } from '../theme/globalStyles'
import { blue, greenMain } from '../theme/variables'
import ButtonStyled from './ui/ButtonStyled'
import { TextApp } from './ui/TextApp'
import Toast from 'react-native-toast-message'
import { alertMsg } from '../helpers/alertMsg'
import { useSendEmail } from '../api/useReport'
import { Tags } from './ui/Tags'
import Icon from 'react-native-vector-icons/Ionicons';
import { isEmail } from '../helpers/isEmail';

import {  RichEditor } from "react-native-pell-rich-editor";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AuthContext } from '../context/AuthContext'


interface Props {
    mailTo: string[]
    cc: string[]
    link: string
    message: string
    closeModal: (b: boolean) => void
    subject: string
}

export const MailForm = ({ mailTo, cc, link, message, subject, closeModal }: Props) => {

    const { mutate, isLoading } = useSendEmail()

    const { user } = useContext(AuthContext)

    const [mails, setMails] = useState<string[]>([])
    const [ccs, setCcs] = useState<string[]>([])

    const [currentMail, setCurrentMail] = useState("")
    const [currentCC, setCurrentCC] = useState("")
    const [currentSubject, setCurrentSubject] = useState("")

    const [signature, setSignature] = useState(true)

    const richText = React.useRef<HTMLElement>();

    useEffect(() => {
        setMails(mailTo)
        setCcs(cc)
        setCurrentSubject(subject)
    }, [mailTo, cc])

    useEffect(() => {
        richText.current = message as any
    }, [message])



    const sendEmail = () => {

        // console.log(richText.current)
        // return

        if (mails.length === 0) return alertMsg("Error", 'There are not contacts to send')
        if (currentSubject.length < 1) return alertMsg("Error", 'Add a Subject')
        // if (!richText.current || richText.current === "<p><br></p>") return alertMsg("Error", 'Add a Message')

        // return console.log(richText.current, richText.current === "<p><br></p>")

        mutate({
            mailTo: mails,
            cc: ccs,
            subject: currentSubject,
            message: richText.current,
            link: link,
            signature
        }, {
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
    const { msg: msgCC, ok: okCC } = useEmail(currentCC)

    const addEmail = (type: "mailto" | "cc") => {

        if (type === "mailto" && !ok) return alertMsg("Incorrect email", msg)
        if (type === "cc" && !okCC) return alertMsg("Incorrect email", msgCC)

        if (
            mails.includes(currentMail) ||
            mails.includes(currentCC) ||
            ccs.includes(currentMail) ||
            ccs.includes(currentCC)
        ) return alertMsg("Exist", "The email already exist")

        if (type === "mailto") {
            setMails([...mails, currentMail])
            setCurrentMail("")
        }
        if (type === "cc") {
            setCcs([...ccs, currentCC])
            setCurrentCC("")
        }

        Keyboard.dismiss()
    };

    const richTextHandle = (val: any) => {
        richText.current = val
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
                        onSubmitEditing={() => isEmail(currentMail) ? addEmail("mailto") : setCurrentMail("")}
                        style={styles.textInput}
                        onBlur={() => isEmail(currentMail) ? addEmail("mailto") : setCurrentMail("")}
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
                        onSubmitEditing={() => isEmail(currentCC) ? addEmail("cc") : setCurrentCC("")}
                        style={styles.textInput}
                        onBlur={() => isEmail(currentCC) ? addEmail("cc") : setCurrentCC("")}

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
                {/* <TextInput
                    style={{ ...styles.input, height: 120, marginBottom: 30 }}
                    multiline={true}
                    value={messages}
                    onChangeText={(e) => setMessages(e)}
                /> */}
                <View style={{ marginBottom: 10 }}>

                    <RichEditor
                        ref={richText as any}
                        style={styles.richTextEditorStyle}
                        initialContentHTML={message}
                        onChange={richTextHandle}
                    />
                    {/* <RichToolbar
                        editor={richText}
                        selectedIconTint="#873c1e"
                        iconTint="white"
                        // iconTint="#312921"
                        // actions={[
                        //     // actions.insertImage,
                        //     actions.setBold,
                        //     actions.setItalic,
                        //     actions.setUnderline,
                        //     actions.insertBulletsList,
                        //     actions.insertOrderedList,
                        //     // actions.insertLink,
                        //     // actions.setStrikethrough,
                        // ]}
                        style={styles.richTextToolbarStyle}
                    /> */}
                </View>

                <View style={{ ...globalStyles.flexRow, marginBottom: 20 }}>

                    {/* <input
    type="checkbox"
    className='check-on-off'
    checked={signature}
    onChange={(e) => setSignature(e.target.checked)}
/> */}

                    <BouncyCheckbox
                        isChecked={signature}
                        size={20}
                        fillColor={greenMain}
                        unfillColor="#FFFFFF"
                        iconStyle={{ marginRight: -8 }}
                        onPress={(e) => setSignature(!signature)}
                    />

                    <View style={{...globalStyles.flexRow}}>
                        <Image source={require("../assets/qc-logo-color.png")} style={{ width: 70, height: 70 }} resizeMode="contain" />
                        <View style={{marginLeft:10}}>
                            <TextApp bold>{user?.name} {user?.lastname}</TextApp>
                            {
                                user?.phone &&
                                <TextApp size='s'>{user.phone}</TextApp>
                            }
                            <TextApp size='s'>{user?.email! || "--"}</TextApp>
                        </View>
                    </View>
                </View>

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
        paddingVertical: Platform.OS === 'android' ? 3 : 5,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
    },

    // richTextContainer: {
    //     display: "flex",
    //     flexDirection: "column-reverse",
    //     width: "100%",
    //     marginBottom: 30,
    //   },

    richTextEditorStyle: {
        borderRadius: 10,
        borderWidth: Platform.OS === "ios" ? .5 : 1,
        borderColor: blue,
        fontSize: 20,
    },

    //   richTextToolbarStyle: {
    //     // backgroundColor: "#c6c3b3",
    //     backgroundColor: blue,
    //     borderColor: blue,
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,
    //     borderWidth: 1,
    //   },
});