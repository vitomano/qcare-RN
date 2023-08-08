import React from 'react'
import { View } from 'react-native'
import { MainInfo, NewGrower } from '../../interfaces/intakes.reports';
import { ActionNum, GradeNum } from '../../interfaces/interfaces';
import { globalStyles } from '../../theme/globalStyles';
import { ActionColor } from '../ui/ActionColor';
import { GradeColor } from '../ui/GradeColor';
import { bgColor } from '../../theme/variables';
import { TextApp } from '../ui/TextApp';


interface Props {
    mainData: MainInfo
    grade: GradeNum
    action: ActionNum
    addGrower?: NewGrower | null
}

export const CardPrereportItem = ({ mainData, grade, action, addGrower = null }: Props) => {

    return (

        <View style={{ ...globalStyles.flexRow, marginBottom: 5 }}>

            <View style={{ ...globalStyles.flexBetween, flex: 1, height: "100%", borderRadius: 5, paddingHorizontal: 10, marginRight: 5, backgroundColor: bgColor }}>
                <TextApp size='s'>
                    {
                        addGrower === null
                            ? mainData.grower || "--"
                            : addGrower.grower_variety || mainData.grower || "--"
                    }
                </TextApp>
                <TextApp size='s' bold>
                    {
                        addGrower === null
                            ? mainData.total_boxes || '--'
                            : addGrower.boxes || '--'
                    }
                </TextApp>
            </View>

            <View style={{ width: "22%", marginRight: 5 }}>
                <GradeColor grade={grade} />
            </View>
            <View style={{ width: "22%" }}>
                <ActionColor action={action} />
            </View>


        </View>
    )
}