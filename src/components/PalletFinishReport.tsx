import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import { IntakeContext } from '../context/IntakeContext'
import { SCORE } from '../data/selects'
import { PalletState } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { lightGrey } from '../theme/variables'
import { InputPallet } from './InputPallet'
import { PickerModal } from './modals/PickerModal'
import { Status } from '../interfaces/interfaces';
import ButtonStyled from './ui/ButtonStyled'
import { CentredContent } from './CenterContent';
import { NewItem } from './NewItem';
import { TextApp } from './ui/TextApp';
import { PalletNum } from './ui/PalletNum';
import { GrowerShow } from './GrowerShow';
import { ModalContainer } from './modals/ModalContainer';
import { PrereportModal } from './modals/PrereportModal';

interface Props {
    pallet: PalletState,
    i: number
}

export const PalletFinishReport = ({ pallet, i }: Props) => {

    const { handleStatus, addFiles } = useContext(IntakeContext)

    const [modalScore, setModalScore] = useState(false)

    const [modalLabels, setModalLabels] = useState(false)
    const [modalApp, setModalApp] = useState(false)
    const [modalPallgrow, setModalPallgrow] = useState(false)

    const [predata, setPredata] = useState(false)

    const handleSelect = (val: string, status: Status) => handleStatus(pallet.id, status, val)

    const openLibrary = () => {

        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0,
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
                    {
                        pallet.prereport !== null &&
                        <TouchableOpacity
                            onPress={() => setPredata(true)}
                        >
                            <TextApp size='s' style={{ textDecorationLine: 'underline' }}>pre report</TextApp>

                            <ModalContainer
                                modal={predata}
                                openModal={setPredata}
                            >
                                <View>
                                    <PrereportModal prereport={pallet.prereport!} />
                                    <CentredContent>
                                        <ButtonStyled
                                            onPress={() => setPredata(false)}
                                            text='Ok'
                                            blue
                                            width={50}
                                        />
                                    </CentredContent>
                                </View>

                            </ModalContainer>

                        </TouchableOpacity>
                    }
                </View>

                {
                    pallet.addGrower &&
                    <GrowerShow grower={pallet.addGrower!} style={{ marginBottom: 20 }} />
                }

                {
                    pallet.labels.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Labels</TextApp>
                        {
                            pallet.labels.map((lab, i) => (
                                <InputPallet
                                    key={i}
                                    pallet={pallet}
                                    item={lab}
                                    detailName="labels"
                                />
                            ))
                        }
                        <NewItem
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
                                <InputPallet
                                    key={i}
                                    pallet={pallet}
                                    item={app}
                                    detailName="appareance"
                                />
                            ))
                        }

                        <NewItem
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
                                <InputPallet
                                    key={i}
                                    pallet={pallet}
                                    item={pall}
                                    detailName="pallgrow"
                                />
                            ))
                        }
                        <NewItem
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

                <CentredContent style={{ marginBottom: 10 }}>
                    <>
                        <ButtonStyled
                            text='Select Images'
                            width={60}
                            outline
                            onPress={openLibrary}
                            icon="camera-outline"
                        />
                        {
                            pallet.images.length > 0 &&
                            <TextApp size='s' style={{ marginTop: 15 }}>{pallet.images.length} file/s selected</TextApp>
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