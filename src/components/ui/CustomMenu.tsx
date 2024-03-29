import React, { useState } from 'react'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/Ionicons';
import { useRemovePrereport } from '../../api/usePrereports';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { TextApp } from './TextApp';
import { useNavigation } from '@react-navigation/native';
import { alertMsg } from '../../helpers/alertMsg';


interface Props{
    id:string
}

export const CustomMenu = ({ id }:Props) => {

    const [confirmation, setConfirmation] = useState(false)
    const navigation = useNavigation()
    
    const { mutate, isLoading } = useRemovePrereport()

    const handleDelete = async () => {
        mutate(id, {
            onError:() => {
                alertMsg("Error", "Something went wrong")
            },
            onSuccess:() => setConfirmation(false)
        })
        
    };


    return (
        <Menu>
            <MenuTrigger>
                <Icon size={20} name="ellipsis-vertical" />
            </MenuTrigger>
            <MenuOptions customStyles={{
                optionsContainer: {
                    borderRadius: 10,
                    padding: 5,
                    marginTop: 25
                }, optionText: {
                    fontSize: 16,
                }
            }}
            >
                <MenuOption onSelect={() => navigation.navigate('PreReportFinishScreen' as never, { id: id } as never)}
                    customStyles={{
                        optionWrapper: {
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 6
                        },
                    }}>
                    <Icon size={20} name="document-text-outline"/>
                    <TextApp style={{ marginLeft: 10 }}>Finish Report</TextApp>
                </MenuOption>

                <MenuOption onSelect={ () => setConfirmation(true) }
                    customStyles={{
                        optionWrapper: {
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 6
                        },
                    }}>
                    <Icon size={20} name="trash-outline"/>
                    <TextApp style={{ marginLeft: 10 }}>Delete Pre report</TextApp>
                </MenuOption>
            </MenuOptions>
            
            <ModalConfirmation
                modal={ confirmation }
                openModal={ setConfirmation }
                message="Are you sure you want to remove this Pre Report"
                action={ handleDelete }
                loading={isLoading}
            />

        </Menu>
    )
}
