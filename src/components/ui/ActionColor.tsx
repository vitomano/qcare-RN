import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { stringAction } from '../../helpers/stringAction';
import { ActionNum } from '../../interfaces/interfaces';
import { action0, action1, action2, action3, action4, action5, action6, action7, text } from '../../theme/variables';
import { TextApp } from './TextApp';

interface Props {
    action: ActionNum
    style?: StyleProp<ViewStyle>
}

export const ActionColor = ({ action = "0", style }: Props) => {

    const bgColor = [
        action === "0" && {backgroundColor: action0},
        action === "1" && {backgroundColor: action1},
        action === "2" && {backgroundColor: action2},
        action === "3" && {backgroundColor: action3},
        action === "4" && {backgroundColor: action4},
        action === "5" && {backgroundColor: action5},
        action === "6" && {backgroundColor: action6},
        action === "7" && {backgroundColor: action7},
    ]

    const textStyle = [
        action === "4" && {color: text, fontSize: 10},
        action === "5" && {color: text, fontSize: 8.5, lineHeight: 8.5},
        action === "6" && {color: text, fontSize: 10},
        action === "7" && {fontSize: 10},
    ]

    return (
    <View style={[...bgColor, {alignItems: "center", justifyContent: "center" ,borderRadius: 5, paddingHorizontal: 5, minHeight: 30, ...style as any}]}>
        <TextApp size='xs' bold color='white' style={[...textStyle, { textAlign: "center"}]}>{ stringAction(action) }</TextApp>
    </View>
    )

};


