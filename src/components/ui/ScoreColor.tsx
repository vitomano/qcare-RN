import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native';
import { stringScore } from '../../helpers/stringScore';
import { ScoreNum } from '../../interfaces/interfaces';
import { score0, score1, score2, score3, score4, score5, score6, score7, score8, text } from '../../theme/variables';
import { TextApp } from './TextApp';

interface Props {
    score: ScoreNum
    style?: StyleProp<ViewStyle>
}

export const ScoreColor = ({ score = '0', style }: Props) => {

    const bgColor = [
        score === "0" && {backgroundColor: score0},
        score === "1" && {backgroundColor: score1},
        score === "2" && {backgroundColor: score2},
        score === "3" && {backgroundColor: score3},
        score === "4" && {backgroundColor: score4},
        score === "5" && {backgroundColor: score5},
        score === "6" && {backgroundColor: score6},
        score === "7" && {backgroundColor: score7},
        score === "8" && {backgroundColor: score8},
    ]

    const textStyle = [
        score === "4" && {color: text},
        score === "5" && {color: text},
        score === "6" && {color: text},
    ]

    return (
    <View style={[...bgColor, {alignItems: "center", justifyContent: "center" ,borderRadius: 5, paddingHorizontal: 5, minHeight: 30, ...style as any}]}>
        <TextApp size='xs' bold color='white' style={[...textStyle, { textAlign: "center"}]}>{ stringScore(score) }</TextApp>
    </View>
    )

};


