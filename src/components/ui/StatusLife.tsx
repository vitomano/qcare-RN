import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { LifeTest } from '../../interfaces/interface.lifeTest'
import { inputColor } from '../../theme/variables'
import { TextApp } from './TextApp'

interface Props{
    lifeTest: LifeTest
}

export const StatusLife = ({lifeTest}:Props) => {

    const [text, setText] = useState<string>("PENDING")

    useEffect(() => {
        lifeTest.status === false && lifeTest.test.length === 0 && setText("PENDING")
        lifeTest.status === false && lifeTest.test.length > 0 && setText("IN PROCESS")
        lifeTest.status === true && setText("DONE")
    }, [lifeTest])

    const bgColor = [
        lifeTest.status === false && lifeTest.test.length === 0 && styles.colorPending,
        lifeTest.status === false && lifeTest.test.length > 0 && styles.colorInProcess,
        lifeTest.status === true && styles.colorDone,
    ]
    const textColor = [
        lifeTest.status === false && lifeTest.test.length > 0 && styles.textInProcess,
        lifeTest.status === true && styles.textDone,
    ]

  return (
    <View style={[ styles.container, bgColor ]}>
        <TextApp style={[styles.text, textColor]}>{ text }</TextApp>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 8
    },
    text:{ textAlign: "center" ,fontSize: 10 },

    textInProcess:{ color: "#c97500" },
    textDone:{ color: "#1a9141" },

    colorPending:{ backgroundColor: inputColor },
    colorInProcess:{ backgroundColor: "#ffe4b3" },
    colorDone:{ backgroundColor: "#cdeece" },
});