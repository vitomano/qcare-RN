import React, { useState } from 'react'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/Ionicons';
import { useRemovePrereport } from '../../api/usePrereports';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { TextApp } from './TextApp';
import { useNavigation } from '@react-navigation/native';
import { ModalBlock } from '../modals/ModalBlock';
import { Share } from '../Share';
import { Report } from '../../interfaces/intakes.reports';


interface Props {
    id: string
    handleDelete: () => void
    data: Report
}

export const CustomMenuReport = ({ handleDelete, data }: Props) => {

    const [confirmation, setConfirmation] = useState(false)
    const [modalShare, setModalShare] = useState(false)

    const navigation = useNavigation()

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
                <MenuOption onSelect={() => setModalShare(true)}
                    customStyles={{
                        optionWrapper: {
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 6
                        },
                    }}>
                    <Icon size={20} name="mail-outline" />
                    <TextApp style={{ marginLeft: 10 }}>Share report</TextApp>
                </MenuOption>

                <MenuOption onSelect={() => setConfirmation(true)}
                    customStyles={{
                        optionWrapper: {
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 6
                        },
                    }}>
                    <Icon size={20} name="trash-outline" />
                    <TextApp style={{ marginLeft: 10 }}>Delete Report</TextApp>
                </MenuOption>
            </MenuOptions>

            <ModalConfirmation
                modal={confirmation}
                openModal={setConfirmation}
                message="Are you sure you want to remove this Report"
                action={handleDelete}
            />

            <ModalBlock
                modal={modalShare}
                openModal={setModalShare}
            >
                <Share
                    closeModal={setModalShare}
                    data={data!}
                />
            </ModalBlock>

        </Menu>
    )
}
