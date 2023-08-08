import React from 'react'
import { View } from 'react-native'
import { itemValor } from '../../helpers/eliminarEs'
import { PrereportPallet } from '../../interfaces/intakes.reports'
import { globalStyles } from '../../theme/globalStyles'
import { inputStyles } from '../../theme/inputStyles'
import { darkGrey, lightGrey } from '../../theme/variables'
import { ActionColor } from './ActionColor'
import { GradeColor } from './GradeColor'
import { ScoreColor } from './ScoreColor'
import { TextApp } from './TextApp'

interface Props {
    prereport: PrereportPallet
}

export const PrereportInfo = ({ prereport }: Props) => {
    return (
        <View style={{ borderColor: darkGrey, borderRadius: 10, borderWidth: .5, padding: 10, position: "relative", marginBottom: 25, marginTop: 10 }}>
            <View style={{
                position: "absolute", top: -10, left: 10,
                backgroundColor: darkGrey, borderRadius: 50, alignSelf: "flex-start", padding: 3, paddingHorizontal: 10
            }}>
                <TextApp size='s' color='white'>Pre report</TextApp>
            </View>

            <View style={{ marginTop: 15 }}>
                {
                    prereport.details.labels &&
                    <View style={{ marginBottom: 25 }}>
                        <TextApp bold style={{ marginBottom: 10 }}>Labels</TextApp>
                        {
                            prereport.details.labels.map(lab => (
                                <View key={lab.name} style={{ ...globalStyles.flexRow, paddingVertical: 3, borderBottomWidth: .5, borderBottomColor: lightGrey }}>
                                    <TextApp style={{ width: "50%" }}>{lab.label}</TextApp>
                                    <TextApp bold style={{ flex: 1, textAlign: "right" }}>{itemValor(lab.valor)}</TextApp>
                                </View>
                            ))
                        }
                    </View>
                }
                {
                    prereport.details.appareance &&
                    <View style={{ marginBottom: 25 }}>
                        <TextApp bold style={{ marginBottom: 10 }}>Appearance</TextApp>
                        {
                            prereport.details.appareance.map(app => (
                                <View key={app.name} style={{ ...globalStyles.flexRow, paddingVertical: 3, borderBottomWidth: .5, borderBottomColor: lightGrey }}>
                                    <TextApp style={{ width: "50%" }}>{app.label}</TextApp>
                                    <TextApp bold style={{ flex: 1, textAlign: "right" }}>{itemValor(app.valor)}</TextApp>
                                </View>
                            ))
                        }
                    </View>
                }
            </View>

            <View>
                <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <TextApp style={{ width: "50%" }}>Score</TextApp>
                    <View style={{ flex: 1 }}>
                        <ScoreColor score={prereport.score as any} style={inputStyles.selectShape} />
                    </View>
                </View>
                <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <TextApp style={{ width: "50%" }}>QC Appreciation</TextApp>
                    <View style={{ flex: 1 }}>
                        <GradeColor grade={prereport.grade as any} style={inputStyles.selectShape} />
                    </View>
                </View>
                <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                    <TextApp style={{ width: "50%" }}>Suggested commercial action</TextApp>
                    <View style={{ flex: 1 }}>
                        <ActionColor action={prereport.action as any} style={inputStyles.selectShape} />
                    </View>

                </View>

            </View>


        </View>
    )
}
