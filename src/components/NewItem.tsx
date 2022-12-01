import React, { useContext, useEffect, useState } from 'react'
import { Alert, Text, TextInput, View } from 'react-native'
import { capitalize, inputJson } from '../helpers/eliminarEs'
import { useForm } from '../hooks/useForm'
import { DataPrereport, DetailObject, PalletState } from '../interfaces/intakes.reports'
import { DetailName } from '../interfaces/interfaces'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles'
import { danger } from '../theme/variables'
import { AddItemButton } from './AddItemButton'
import { ModalContainer } from './modals/ModalContainer'
import ButtonStyled from './ui/ButtonStyled'
import { TextApp } from './ui/TextApp'
import { TextH2 } from './ui/TextH2'
import { IntakeContext } from '../context/IntakeContext';


interface Props {
    pallet: DataPrereport | PalletState,
    detailName: DetailName
    modal: boolean,
    openModal: (item: boolean) => void
}

export const NewItem = ({ pallet, detailName, modal, openModal }: Props) => {

    const [correct, setCorrect] = useState(false)
    const { addItem } = useContext( IntakeContext )

    const { name, value, onChange } = useForm({
        name: "",
        value: ""
    })

    useEffect(() => {
        if (name.length >= 2 && value.length > 0 && /^[a-zA-Z_ ]*$/.test(name)) setCorrect(true)
        else setCorrect(false)
    }, [name, value])


    const addNewItem = () => {

        const labelExist = pallet[detailName].find(labl => labl.label === name.trim())
        const nameExist = pallet[detailName].find(labl => labl.name === inputJson(name.trim()))

        if (labelExist || nameExist) {
            return Alert.alert(
                "Alert",
                `Name "${capitalize(name.trim())}" already exist`,
                [{ text: "OK" }]
            );
        }

        const newItem:DetailObject = { check: true, tipe: "text", label: name, name: inputJson(name), valor: value }

        addItem( pallet.id, detailName, newItem )
        openModal(false)
    };


    return (
        <>
            <AddItemButton title="Add item" handlePress={() => openModal(true)} />
            <ModalContainer
                openModal={openModal}
                modal={modal}
            >
                <TextH2 style={{ marginBottom: 20 }}>New item</TextH2>

                <View style={{ marginBottom: 15 }}>
                    <TextApp style={{ marginBottom: 5 }}>Name</TextApp>
                    <TextInput
                        keyboardType='default'
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ ...inputStyles.inputOutline, paddingVertical: 15, fontSize: 18 }}
                        onChangeText={(e) => onChange(e, "name")}
                    />

                    {
                        !(/^[a-zA-Z_ ]*$/.test(name)) &&
                        <Text style={{ color: danger, marginTop: 5 }}>*Name must be only letters</Text>
                    }
                </View>

                <TextApp style={{ marginBottom: 5 }}>Value</TextApp>
                <TextInput
                    keyboardType='default'
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ ...inputStyles.inputOutline, paddingVertical: 15, fontSize: 18, }}
                    onChangeText={(e) => onChange(e, "value")}
                />
                <View style={{ ...globalStyles.flexBetween, marginTop: 30, marginBottom: 10 }}>
                    <ButtonStyled
                        onPress={() => openModal(false)}
                        text='Cancel'
                        outline
                        width={48}
                    />
                    {
                        correct
                            ?
                            <ButtonStyled
                                onPress={addNewItem}
                                text='Add Item'
                                danger
                                outline
                                width={48}
                            />
                            :
                            <ButtonStyled
                                onPress={addNewItem}
                                text='Add Item'
                                disabled
                                width={48}
                            />
                    }
                </View>
            </ModalContainer>
        </>
    )
}
