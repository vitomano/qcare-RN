import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SCORE } from '../data/selects'
import { PalletState } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { lightGrey } from '../theme/variables'
import { InputPalletNew } from './InputPalletNew'
import { PickerModal } from './modals/PickerModal'
import { Status } from '../interfaces/interfaces';
import ButtonStyled from './ui/ButtonStyled'
import { CentredContent } from './CenterContent';
import { AddItemButton } from './AddItemButton';
import { GrowerInputs } from './GrowerInputs';
import { ModalConfirmation } from './modals/ModalConfirmation';
import { NewItemCreate } from './NewItemCreate';
import { TextApp } from './ui/TextApp';
import { PalletNum } from './ui/PalletNum';
import { CreateContext } from '../context/CreateContext';
import { ImageSelected } from './ImageSelected';
import { useCameraLibrary } from '../hooks/useCameraLibrary';

interface Props {
    pallet: PalletState,
    i: number
}

export const PalletNewReport = ({ pallet, i }: Props) => {

    const { limit, handleStatus, addGrower, backGrower, removePallet, addTempFiles, removeTempFiles } = useContext(CreateContext)

    const [modalScore, setModalScore] = useState(false)

    const [modalLabels, setModalLabels] = useState(false)
    const [modalApp, setModalApp] = useState(false)
    const [modalPallgrow, setModalPallgrow] = useState(false)

    const [removeModal, setRemoveModal] = useState(false)

    const handleSelect = (val: string, status: Status) => handleStatus(pallet.id, status, val)

    const { showImagePicker, allowed } = useCameraLibrary(limit, pallet.images.length)

    const selectImages = () => {
        showImagePicker((res) => {
            addTempFiles(pallet.id, res.files)
        })
    };

    return (
        <View
            style={{ ...globalStyles.shadow, marginVertical: 2 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ ...globalStyles.flexBetween, marginBottom: 20 }}>
                    <PalletNum num={i + 1} />
                    <TouchableOpacity
                        onPress={() => setRemoveModal(true)}
                    >
                        <TextApp color="danger" size='s'>remove</TextApp>
                        <ModalConfirmation
                            modal={removeModal}
                            openModal={setRemoveModal}
                            action={() => removePallet(pallet.id)}
                            message="Are you sure you want to remove this pallet?"
                        />
                    </TouchableOpacity>
                </View>

                {
                    pallet.labels.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Labels</TextApp>
                        {
                            pallet.labels.map((lab, i) => (
                                <InputPalletNew
                                    key={i}
                                    pallet={pallet}
                                    item={lab}
                                    detailName="labels"
                                />
                            ))
                        }
                        <NewItemCreate
                            pallet={pallet}
                            detailName="labels"
                            modal={modalLabels}
                            openModal={setModalLabels}
                        />

                    </View>
                }

                {
                    pallet.appareance.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Appearance</TextApp>
                        {

                            pallet.appareance.map((app, i) => (
                                <InputPalletNew
                                    key={i}
                                    pallet={pallet}
                                    item={app}
                                    detailName="appareance"
                                />
                            ))
                        }

                        <NewItemCreate
                            pallet={pallet}
                            detailName="appareance"
                            modal={modalApp}
                            openModal={setModalApp}
                        />
                    </View>
                }

                {
                    pallet.pallgrow.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Pall/Grower</TextApp>
                        {
                            pallet.pallgrow.map((pall, i) => (
                                <InputPalletNew
                                    key={i}
                                    pallet={pallet}
                                    item={pall}
                                    detailName="pallgrow"
                                />
                            ))
                        }
                        <NewItemCreate
                            pallet={pallet}
                            detailName="pallgrow"
                            modal={modalPallgrow}
                            openModal={setModalPallgrow}
                        />
                    </View>
                }

                <View style={styles.detailSection}>

                    <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                        <TextApp style={{ width: "50%" }}>Score</TextApp>

                        <PickerModal
                            modal={modalScore}
                            openModal={setModalScore}
                            LIST={SCORE}
                            setState={handleSelect}
                            state={pallet.score}
                            option="score"
                        />
                    </View>
                </View>

                {
                    pallet.newGrower !== null
                        ? <>
                            <GrowerInputs pallet={pallet} createNew />
                            <AddItemButton title="Back to single Grower / Variety" icon="arrow-back-circle-outline" handlePress={backGrower} />
                        </>
                        : <AddItemButton title="Add Grower / Variety" handlePress={addGrower} />

                }

                {
                    pallet.images.length > 0 &&
                    <View style={{ marginTop: 20 }}>
                        <ImageSelected images={pallet.images} deleteAction={removeTempFiles} pid={pallet.id} />
                    </View>
                }

                <CentredContent style={{ marginTop: 20, marginBottom: 10 }}>
                    <ButtonStyled
                        text='Select Images'
                        width={60}
                        outline
                        onPress={selectImages}
                        icon="camera-outline"
                        btnDisabled={ allowed === 0 }
                    />
                </CentredContent>

                {
                    allowed > 0 &&
                    <TextApp center color='mute' size='s'>Max. {allowed} Images</TextApp>
                }

            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    detailSection: {
        borderBottomWidth: .5,
        borderBottomColor: lightGrey,
        paddingBottom: 15,
        marginBottom: 20
    }
});