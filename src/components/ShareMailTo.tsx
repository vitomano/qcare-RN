import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'

import { AuthContext } from '../context/AuthContext'

import { PickerModal } from './modals/PickerModal'
import { Tags } from './ui/Tags'
import { TextApp } from './ui/TextApp'

interface Props {
    mailTo: string[]
    setMailTo: (v: string[]) => void
    cc: string[]
    setCC: (v: string[]) => void
}

type PropsMailTo = {
    value: string,
    label: string
}

export const ShareMailTo = ({ mailTo, setMailTo, cc, setCC }: Props) => {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const contacts = user?.contacts?.map(contact => { return { value: contact.email, label: `(${contact.ref}) ${contact.email}` } })
        setContactsList([{
            value: "0",
            label: "Select a contact"
        }, ...contacts!])
    }, [])



    const [modalMailTo, setmodalMailTo] = useState(false)
    const [modalCC, setmodalCC] = useState(false)
    const [contactsList, setContactsList] = useState<PropsMailTo[]>([])

    const [selected, setSelected] = useState<string>("0")
    const [selectedCC, setSelectedCC] = useState<string>("0")

    const selectMails = (val: string, opt: string) => {

        if (mailTo.includes(val) || cc.includes(val)) return

        if (opt === "mailto") {
            setMailTo([...mailTo, val])
            setSelected(val)
        }

        if (opt === "cc") {
            setCC([...cc, val])
            setSelectedCC(val)
        }
    };

    return (
        <>
            {
                contactsList.length > 0 &&
                <View style={{ marginBottom: 20 }}>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 70 }}>
                            <TextApp bold style={{ paddingVertical: 10 }}>Mail to:</TextApp>
                        </View>

                        <View style={{ flex: 1 }}>
                            <PickerModal
                                modal={modalMailTo}
                                openModal={setmodalMailTo}
                                LIST={contactsList}
                                setState={selectMails}
                                state={selected}
                                option="mailto"
                                outline
                            />
                            {
                                mailTo.length > 0 &&
                                <Tags tags={mailTo} setTags={setMailTo} style={{ marginTop: 5 }} nowrap/>
                            }
                        </View>


                    </View>


                    <View style={{ marginBottom: 15 }} />

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 70 }}>
                            <TextApp bold style={{ paddingVertical: 10 }}>CC:</TextApp>
                        </View>
                        <View style={{ flex: 1 }}>

                            <PickerModal
                                modal={modalCC}
                                openModal={setmodalCC}
                                LIST={contactsList}
                                setState={selectMails}
                                state={selectedCC}
                                option="cc"
                                outline
                            />
                            {
                                cc.length >= 0 &&
                                <Tags tags={cc} setTags={setCC} style={{ marginTop: 5 }} nowrap/>
                            }

                        </View>


                    </View>

                </View>
            }
        </>
    )
}
