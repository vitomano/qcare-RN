import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { stringGrade } from '../../helpers/stringGrade';
import { GradeNum } from '../../interfaces/interfaces';
import { grade0, grade1, grade2, grade3, grade4, grade5, grade6, text } from '../../theme/variables';
import { TextApp } from './TextApp';

interface Props {
    grade: GradeNum
    style?: StyleProp<ViewStyle>
}

export const GradeColor = ({ grade = '0', style }: Props) => {

    const bgColor = [
        grade === "0" && {backgroundColor: grade0},
        grade === "1" && {backgroundColor: grade1},
        grade === "2" && {backgroundColor: grade2},
        grade === "3" && {backgroundColor: grade3},
        grade === "4" && {backgroundColor: grade4},
        grade === "5" && {backgroundColor: grade5},
        grade === "6" && {backgroundColor: grade6},
    ]

    const textStyle = [
        grade === "2" && {fontSize: 10},
        grade === "4" && {color: text, fontSize: 10},
        grade === "5" && {color: text},
    ]

    return (
    <View style={[...bgColor, {alignItems: "center", justifyContent: "center" ,borderRadius: 5, paddingHorizontal: 5, minHeight: 30, ...style as any}]}>
        <TextApp size='xs' bold color='white' style={[...textStyle, { textAlign: "center"}]}>{ stringGrade(grade) }</TextApp>
    </View>
    )

};
