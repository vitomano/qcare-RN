import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

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
import { photosLimit } from '../helpers/imagesLength';

interface Props {
    pallet: PalletState,
    i: number
}

export const PalletNewReport = ({ pallet, i }: Props) => {

    const { pallets, handleStatus, addFiles, addGrower, backGrower, removePallet } = useContext(CreateContext)

    const [modalScore, setModalScore] = useState(false)

    const [modalLabels, setModalLabels] = useState(false)
    const [modalApp, setModalApp] = useState(false)
    const [modalPallgrow, setModalPallgrow] = useState(false)

    const [removeModal, setRemoveModal] = useState(false)

    const handleSelect = (val: string, status: Status) => handleStatus(pallet.id, status, val)

    const openLibrary = () => {

        launchImageLibrary({
            mediaType: 'photo',
            // selectionLimit: 0,
            selectionLimit: photosLimit(pallets) || 1

        }, (res) => {
            if (res.didCancel) return
            if (!res.assets) return
            addFiles(pallet.id, res.assets)
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

                <CentredContent style={{ marginTop: 20, marginBottom: 10 }}>
                    <>
                        <ButtonStyled
                            text='Select Images'
                            width={60}
                            outline
                            onPress={openLibrary}
                            icon="camera-outline"
                        />
                        {
                            pallet.images.length > 0
                                ? <TextApp size='s' style={{ marginTop: 15 }}>{pallet.images.length} file/s selected</TextApp>
                                : <TextApp size='s' color='mute' style={{ marginTop: 15 }}>Max. {photosLimit(pallets) || 0} images</TextApp>
                        }
                    </>
                </CentredContent>

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