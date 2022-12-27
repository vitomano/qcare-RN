import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PrereportPallet } from '../../interfaces/intakes.reports'
import { globalStyles } from '../../theme/globalStyles'
import { TextApp } from '../ui/TextApp'
import { inputColor } from '../../theme/variables';
import { itemValor } from '../../helpers/eliminarEs'
import { GradeColor } from '../ui/GradeColor'
import { ActionColor } from '../ui/ActionColor'
import { ScoreColor } from '../ui/ScoreColor'
import { inputStyles } from '../../theme/inputStyles'

interface Props {
    prereport: PrereportPallet
}

export const PrereportModal = ({ prereport }: Props) => {
    return (
        <View>
            {
                prereport.details?.labels.length > 0 &&
                <View style={styles.detailSection}>
                    <TextApp bold style={{ marginBottom: 10 }}>Labels</TextApp>
                    {
                        prereport.details.labels.map(lab => (
                            <View key={lab.name} style={{ ...globalStyles.flexRow, borderBottomWidth: 1, borderBottomColor: inputColor, paddingVertical: 5 }}>
                                <TextApp style={{ width: "50%", marginRight: 10 }}>{lab.label}</TextApp>
                                <TextApp>{itemValor(lab.valor)}</TextApp>

                            </View>
                        ))
                    }

                </View>
            }
            {
                prereport.details?.appareance.length > 0 &&
                <View style={styles.detailSection}>
                    <TextApp bold style={{ marginBottom: 10 }}>Appearance</TextApp>
                    {
                        prereport.details.appareance.map(lab => (
                            <View key={lab.name} style={{ ...globalStyles.flexRow, borderBottomWidth: 1, borderBottomColor: inputColor, paddingVertical: 5 }}>
                                <TextApp style={{ width: "50%", marginRight: 10 }}>{lab.label}</TextApp>
                                <TextApp>{itemValor(lab.valor)}</TextApp>

                            </View>
                        ))
                    }

                </View>
            }
            
            {
                prereport.details.pallgrow &&
                <View style={styles.detailSection}>
                    <TextApp bold style={{ marginBottom: 10 }}>Pall/Grower</TextApp>
                    {
                        prereport.details.pallgrow.map(lab => (
                            <View key={lab.name} style={{ ...globalStyles.flexRow, borderBottomWidth: 1, borderBottomColor: inputColor, paddingVertical: 5 }}>
                                <TextApp style={{ width: "50%", marginRight: 10 }}>{lab.label}</TextApp>
                                <TextApp>{itemValor(lab.valor)}</TextApp>

                            </View>
                        ))
                    }

                </View>
            }

            <View style={{ marginBottom: 20 }}>

                <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <TextApp style={{ width: "50%" }}>QC Appreciation</TextApp>

                    <GradeColor grade={prereport.grade} style={{...inputStyles.selectShape, width: "50%"}} />
                </View>
                <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <TextApp style={{ width: "50%" }}>Suggested commercial action</TextApp>

                    <ActionColor action={prereport.action} style={{...inputStyles.selectShape, width: "50%"}} />
                </View>
                <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <TextApp style={{ width: "50%" }}>Score</TextApp>

                    <ScoreColor score={prereport.score} style={{...inputStyles.selectShape, width: "50%"}} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    detailSection: {
        paddingBottom: 15,
        marginBottom: 20
    }
});